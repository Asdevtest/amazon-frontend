import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {BACKEND_API_URL} from '@constants/env'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatusByKey, ProductStatus} from '@constants/product-status'
import {texts} from '@constants/texts'

import {BuyerModel} from '@models/buyer-model'
import {BuyerUpdateProductContract} from '@models/buyer-model/buyer-model.contracts'
import {OtherModel} from '@models/other-model'
import {ProductModel} from '@models/product-model'
import {SupplierModel} from '@models/supplier-model'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
import {isUndefined} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayBlackList,
  getObjectFilteredByKeyArrayWhiteList,
} from '@utils/object'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductView

const fieldsOfProductAllowedToUpdate = [
  'lsupplier',
  'amazon',
  'reffee',
  'fbalink',
  'fbafee',
  'fbaamount',
  'delivery',
  'status',
  'profit',
  'margin',
  'buyersComment',
  'additionalProp1',
  'currentSupplierId',
]

const formFieldsDefault = {
  checkednotes: '',
  amazon: 0,
  bsr: 0,
  createdAt: '',
  createdBy: {},
  delivery: 0,
  dirdecision: 0,
  express: false,
  fba: false,
  fbafee: 0,
  icomment: '',
  id: '',
  images: [],
  lamazon: '',
  material: '',
  reffee: 15,
  status: 0,
  updatedAt: '',
  _id: '',
  buyersComment: '',
}

const confirmMessageByProductStatus = {
  60: 'Прайс поставщика не подходит?',
  50: 'Поставщик не найден?',
  40: 'Поставщик найден?',
}

const warningModalTitleVariants = {
  NO_SUPPLIER: 'Нельзя выбрать без поставщика.',
  CHOOSE_STATUS: 'Нужно выбрать статус',
}

export class BuyerProductViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  product = undefined
  suppliers = []
  curUpdateProductData = {}
  warningModalTitle = ''

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false

  showWarningModal = false
  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickOkBtn: () => this.onSaveProductData(),
  }

  readyImages = []
  progressValue = 0
  showProgress = false

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  constructor({history, location}) {
    this.history = history

    if (location.state) {
      const product = {
        ...location.state.product,
        suppliers: location.state.product.suppliers.map(supplierItem =>
          typeof supplierItem === 'string' ? supplierItem : supplierItem._id,
        ),
      }
      this.product = product
      this.suppliers = location.state.suppliers ? location.state.suppliers : location.state.product.suppliers
      updateProductAutoCalculatedFields.call(this)
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeProductFields = fieldsName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldsName]: ''}

      this.product[fieldsName] = e.target.value
      updateProductAutoCalculatedFields.call(this)
    })

  onClickSetProductStatusBtn(statusKey) {
    this.product.status = ProductStatusByKey[statusKey]
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  onChangeProduct(e, value) {
    this.product = value
  }

  async onClickSupplierButtons(actionType) {
    switch (actionType) {
      case 'add':
        runInAction(() => {
          this.selectedSupplier = undefined
        })
        this.onTriggerAddOrEditSupplierModal()
        break
      case 'edit':
        this.onTriggerAddOrEditSupplierModal()
        break
      case 'accept':
        this.product.currentSupplierId = this.selectedSupplier._id
        this.product.currentSupplier = this.selectedSupplier
        this.selectedSupplier = undefined
        updateProductAutoCalculatedFields.call(this)
        break
      case 'acceptRevoke':
        this.product.currentSupplierId = undefined
        this.product.currentSupplier = undefined
        this.selectedSupplier = undefined
        updateProductAutoCalculatedFields.call(this)
        break
      case 'delete':
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            message: textConsts.deleteSupplierMessage,
            onClickOkBtn: () => this.onRemoveSupplier(),
          }
        })
        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }
  async onRemoveSupplier() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await ProductModel.removeSuppliersFromProduct(this.product._id, [this.selectedSupplier._id])
      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setActionStatus(loadingStatuses.success)
      const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === this.selectedSupplier._id)

      runInAction(() => {
        this.suppliers.splice(findSupplierIndex, 1)
        this.product.suppliers
        this.selectedSupplier = undefined
        if (this.product.currentSupplierId && this.product.currentSupplierId === this.selectedSupplier._id) {
          this.product.currentSupplierId = undefined
        }
      })
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async handleProductActionButtons(actionType) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus()

        break
      case 'cancel':
        this.history.push('/buyer/my-products')
        break
    }
  }

  async openConfirmModalWithTextByStatus() {
    try {
      this.curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
        this.product,
        fieldsOfProductAllowedToUpdate,
        false,
        (key, value) => {
          if (key === 'buyersComment' && isUndefined(value)) {
            return ''
          } else {
            return value
          }
        },
      )

      await transformAndValidate(BuyerUpdateProductContract, this.curUpdateProductData)

      if (
        (this.curUpdateProductData.currentSupplierId ||
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER]) &&
        this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] &&
        this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]
      ) {
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: false,
            message: confirmMessageByProductStatus[this.curUpdateProductData.status],
            onClickOkBtn: () => this.onSaveProductData(),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
      } else {
        runInAction(() => {
          this.warningModalTitle =
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] ||
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]
              ? warningModalTitleVariants.CHOOSE_STATUS
              : warningModalTitleVariants.NO_SUPPLIER
          this.onTriggerOpenModal('showWarningModal')
        })
      }
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({errorProperty, constraint}) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
          })
        })
      } else {
        console.warn('error ', error)
        runInAction(() => {
          this.error = error
        })
      }
    }
  }

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      await BuyerModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayBlackList(
          this.curUpdateProductData,
          this.curUpdateProductData.currentSupplierId === null ? ['currentSupplierId'] : [],
        ),
      )

      this.setActionStatus(loadingStatuses.success)

      this.history.replace('/buyer/product', {product: toJS(this.product), suppliers: toJS(this.suppliers)})

      this.history.push('/buyer/my-products')
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        console.log(error.body.message)
        this.error = error.body.message
      }
    }
  }

  async onSubmitPostImages({images, type}) {
    const loadingStep = 100 / images.length

    this[type] = []
    this.showProgress = true

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      await this.onPostImage(image, type)
      this.progressValue = this.progressValue + loadingStep
    }

    this.showProgress = false
    this.progressValue = 0
  }

  async onPostImage(imageData, imagesType) {
    const formData = new FormData()
    formData.append('filename', imageData.file)

    try {
      const imageFile = await OtherModel.postImage(formData)

      this[imagesType].push(BACKEND_API_URL + '/uploads/' + imageFile.data.fileName)
    } catch (error) {
      this.error = error
    }
  }

  // async onForcedSaveSelectedFields(selectedFieldsObj) {  МОЖЕТ ПРИГОДИТЬСЯ
  //   try {
  //     await BuyerModel.updateProduct(this.product._id, selectedFieldsObj)
  //   } catch (error) {
  //     this.setActionStatus(loadingStatuses.failed)
  //     console.log('error', error)
  //   }
  // }

  async onClickSaveSupplierBtn(supplier, photosOfSupplier) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.onSubmitPostImages({images: photosOfSupplier, type: 'readyImages'})

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        delivery: parseFloat(supplier?.delivery) || '',
        lotcost: parseFloat(supplier?.lotcost) || '',
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: supplier.images.concat(this.readyImages),
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, ['_id'])
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
        const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === supplier._id)
        this.suppliers[findSupplierIndex] = supplier

        if (supplier._id === this.product.currentSupplierId) {
          this.product.currentSupplier = supplier
          updateProductAutoCalculatedFields.call(this)
        }
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        await ProductModel.addSuppliersToProduct(this.product._id, [createSupplierResult.guid])
        runInAction(() => {
          this.product.suppliers.push(createSupplierResult.guid)
          this.suppliers.push({...supplier, _id: createSupplierResult.guid})
        })
      }

      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerAddOrEditSupplierModal() {
    if (this.showAddOrEditSupplierModal) {
      this.selectedSupplier = undefined
    }
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
