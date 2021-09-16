import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatusByKey, ProductStatus} from '@constants/product-status'
import {texts} from '@constants/texts'

import {BuyerModel} from '@models/buyer-model'
import {BuyerUpdateProductContract} from '@models/buyer-model/buyer-model.contracts'
import {OtherModel} from '@models/other-model'
import {SupplierModel} from '@models/supplier-model'

import {isNotUndefined, isUndefined} from '@utils/checks'
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
  'buyerscomment',
  'additionalProp1',
  'supplier',
  'currentSupplier',
]

const formFieldsDefault = {
  checkednotes: '',
  amazon: 0,
  bsr: 0,
  createdat: '',
  createdby: {},
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
  supplier: [],
  updateDate: '',
  _id: '',
  buyerscomment: '',
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
        supplier: location.state.product.supplier.map(supplierItem =>
          typeof supplierItem === 'string' ? supplierItem : supplierItem._id,
        ),
      }
      this.product = product
      this.suppliers = location.state.suppliers ? location.state.suppliers : location.state.product.supplier
      this.updateAutoCalculatedFields()
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeProductFields = fieldsName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldsName]: ''}

      this.product[fieldsName] = e.target.value
      this.updateAutoCalculatedFields()
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
        this.product.currentSupplier = this.selectedSupplier
        this.selectedSupplier = undefined
        this.updateAutoCalculatedFields()
        break
      case 'acceptRevoke':
        this.product.currentSupplier = undefined
        this.selectedSupplier = undefined
        this.updateAutoCalculatedFields()
        break
      case 'delete':
        this.confirmModalSettings = {
          isWarning: true,
          message: textConsts.deleteSupplierMessage,
          onClickOkBtn: () => this.onRemoveSupplier(),
        }
        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }
  async onRemoveSupplier() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setActionStatus(loadingStatuses.success)
      const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === this.selectedSupplier._id)

      runInAction(() => {
        this.suppliers.splice(findSupplierIndex, 1)
        this.product.supplier
        this.selectedSupplier = undefined
        if (this.product.currentSupplier && this.product.currentSupplier._id === this.selectedSupplier._id) {
          this.product.currentSupplier = undefined
        }
      })

      const forcedSaveSupplierItem = {supplier: [...this.product.supplier]}
      await this.onForcedSaveSelectedFields(forcedSaveSupplierItem)
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
          if (key === 'buyerscomment' && isUndefined(value)) {
            return ''
          } else if (key === 'currentSupplier' && isNotUndefined(value)) {
            return value && value._id
          } else {
            return value
          }
        },
      )

      await transformAndValidate(BuyerUpdateProductContract, this.curUpdateProductData)

      if (
        (this.curUpdateProductData.currentSupplier ||
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER]) &&
        this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] &&
        this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]
      ) {
        this.confirmModalSettings = {
          isWarning: false,
          message: confirmMessageByProductStatus[this.curUpdateProductData.status],
          onClickOkBtn: () => this.onSaveProductData(),
        }

        this.onTriggerOpenModal('showConfirmModal')
      } else {
        this.warningModalTitle =
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] ||
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]
            ? warningModalTitleVariants.CHOOSE_STATUS
            : warningModalTitleVariants.NO_SUPPLIER
        this.onTriggerOpenModal('showWarningModal')
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
      await BuyerModel.updateProduct(this.product._id, this.curUpdateProductData)
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
    formData.append('filename', imageData)

    try {
      const imageFile = await OtherModel.postImage(formData)

      this[imagesType].push('https://api1.kurakste.ru/uploads/' + imageFile.data.fileName)
    } catch (error) {
      this.error = error
    }
  }

  async onForcedSaveSelectedFields(selectedFieldsObj) {
    try {
      await BuyerModel.updateProduct(this.product._id, selectedFieldsObj)
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  async onClickSaveSupplierBtn(supplier, photosOfSupplier) {
    try {
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

      this.setActionStatus(loadingStatuses.isLoading)
      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, ['_id'])
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
        const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === supplier._id)
        this.suppliers[findSupplierIndex] = supplier
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        runInAction(() => {
          this.product.supplier.push(createSupplierResult.guid)
          this.suppliers.push({...supplier, _id: createSupplierResult.guid})
        })

        const forcedSaveSupplierItem = {supplier: [...this.product.supplier]}
        await this.onForcedSaveSelectedFields(forcedSaveSupplierItem)
      }

      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
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

  updateAutoCalculatedFields() {
    this.product.totalFba = (parseFloat(this.product.fbafee) || 0) + (parseFloat(this.product.amazon) || 0) * 0.15
    this.product.maxDelivery = this.product.express ? (this.product.weight || 0) * 7 : (this.product.weight || 0) * 5

    this.product.minpurchase =
      (parseFloat(this.product.amazon) || 0) -
      (parseFloat(this.product.totalFba) || 0) -
      0.4 * ((parseFloat(this.product.amazon) || 0) - (parseFloat(this.product.totalFba) || 0)) -
      (parseFloat(this.product.maxDelivery) || 0)
    if (this.product.currentSupplier && this.product.currentSupplier._id) {
      this.product.reffee = (parseFloat(this.product.amazon) || 0) * 0.15
      if (this.product.fbafee) {
        this.product.profit = (
          (parseFloat(this.product.amazon) || 0).toFixed(2) -
            (this.product.reffee || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) -
            (parseFloat(this.product.fbafee) || 0).toFixed(2) || 0
        ).toFixed(4)
      } else {
        this.product.profit = (
          (parseFloat(this.product.amazon) || 0).toFixed(2) -
            (this.product.reffee || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) || 0
        ).toFixed(4)
      }
      this.product.margin =
        (this.product.profit /
          ((parseFloat(this.product.currentSupplier.price) || 0) +
            (parseFloat(this.product.currentSupplier.delivery) || 0))) *
        100
    } else {
      this.product.profit = 0
      this.product.margin = 0
    }
  }
}
