import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {BACKEND_API_URL} from '@constants/env'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {texts} from '@constants/texts'

import {OtherModel} from '@models/other-model'
import {ProductModel} from '@models/product-model'
import {ResearcherModel} from '@models/researcher-model'
import {ResearcherUpdateProductContract} from '@models/researcher-model/researcher-model.contracts'
import {SupplierModel} from '@models/supplier-model'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {
  getObjectFilteredByKeyArrayWhiteList,
  getObjectFilteredByKeyArrayBlackList,
  getNewObjectWithDefaultValue,
} from '@utils/object'
import {parseFieldsAdapter} from '@utils/parse-fields-adapter'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const textConsts = getLocalizedTexts(texts, 'en').researcherProductView

const fieldsOfProductAllowedToUpdate = [
  'lamazon',
  'lsupplier',
  'bsr',
  'status',
  'amazon',
  'fbafee',
  'reffee',
  'delivery',
  'icomment',
  'fba',
  'profit',
  'margin',
  'images',
  'width',
  'height',
  'length',
  'amazonTitle',
  'amazonDetail',
  'amazonDescription',
  'category',
  'weight',
  'minpurchase',
  'fbaamount',
  'strategyStatus',
  'currentSupplierId',
]

const formFieldsDefault = {
  amazon: '',
  bsr: '',
  createdAt: '',
  createdBy: {},
  delivery: '',
  dirdecision: '',
  express: false,
  fba: false,
  fbafee: '',
  icomment: '',
  id: '',
  images: [],
  lamazon: '',
  material: '',
  reffee: '',
  status: '',
  suppliers: [],
  updatedAt: '',
  _id: '',
  fbaamount: '',
}

const fieldsNotFilledText = 'Не заполнены поля'

const warningModalTitleVariants = {
  NO_SUPPLIER: 'Нельзя выбрать без поставщика.',
  CHOOSE_STATUS: 'Нужно выбрать статус',
}

const confirmMessageByProductStatus = {
  5: 'Отправить на проверку супервизору?',
  10: 'Отправить на проверку с поставщиком?',
}

const confirmMessageWithoutStatus = 'Сохранить без статуса?'

export class ResearcherProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined
  alertFailedText = undefined

  product = undefined
  curUpdateProductData = {}
  suppliers = []

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showConfirmModal = false
  showWarningModal = false

  warningModalTitle = ''

  confirmModalSettings = {
    isWarning: false,
    message: textConsts.confirmMessage,
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
        suppliers: location.state.product.suppliers?.map(supplierItem =>
          typeof supplierItem === 'string' ? supplierItem : supplierItem._id,
        ),
      }
      this.product = product
      this.suppliers = location.state.suppliers ? location.state.suppliers : location.state.product.suppliers
      const inConstructor = true
      this.updateAutoCalculatedFields(inConstructor)
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldName]: ''}
      if (['icomment'].includes(fieldName)) {
        this.product[fieldName] = e.target.value
      } else {
        if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
          return
        }
        if (['bsr', 'fbaamount'].includes(fieldName)) {
          this.product[fieldName] = parseInt(e.target.value)
        } else {
          this.product[fieldName] = e.target.value
        }
      }
      if (['express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba'].includes(fieldName)) {
        this.updateAutoCalculatedFields()
      }
    })

  updateAutoCalculatedFields(inConstructor) {
    const strBsr = this.product.bsr + ''
    this.product.bsr = parseFloat(strBsr.replace(',', '')) || (inConstructor ? '' : 0)

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

  onChangeActiveChip(e, value) {
    this.activeChip = value
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
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
        this.selectedSupplier = undefined
        this.updateAutoCalculatedFields()
        break
      case 'acceptRevoke':
        this.product.currentSupplierId = undefined
        // this.product.currentSupplier = undefined
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

  async handleProductActionButtons(actionType, withoutStatus) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(withoutStatus)
        break
      case 'cancel':
        this.history.goBack()
        break
      case 'delete':
        this.confirmModalSettings = {
          isWarning: true,
          message: textConsts.deleteMessage,
          onClickOkBtn: () => this.onDeleteProduct(),
        }

        this.onTriggerOpenModal('showConfirmModal')

        break
    }
  }

  onClickSetProductStatusBtn(statusKey) {
    if (statusKey === ProductStatus.RESEARCHER_FOUND_SUPPLIER && !this.product.currentSupplierId) {
      this.warningModalTitle = warningModalTitleVariants.NO_SUPPLIER

      this.onTriggerOpenModal('showWarningModal')
    } else {
      this.product.status = ProductStatusByKey[statusKey]
    }
  }

  async openConfirmModalWithTextByStatus(withoutStatus) {
    try {
      this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

      const curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
        toJS(this.product),
        fieldsOfProductAllowedToUpdate,
        true,
        (key, value) => {
          switch (key) {
            case 'bsr':
              return (value && parseInt(value)) || 0
            case 'amazon':
              return (value && parseFloat(value)) || ''
            case 'weight':
              return (value && parseFloat(value)) || ''
            case 'length':
              return (value && parseFloat(value)) || ''
            case 'width':
              return (value && parseFloat(value)) || ''
            case 'height':
              return (value && parseFloat(value)) || ''
            case 'fbaamount':
              return (value && parseFloat(value)) || ''
            case 'fbafee':
              return (value && parseFloat(value)) || ''
            case 'profit':
              return value && parseFloat(value)
            case 'currentSupplier':
              return this.product.currentSupplier._id
            default:
              return value
          }
        },
      )

      await transformAndValidate(ResearcherUpdateProductContract, curUpdateProductData)

      if (withoutStatus) {
        this.curUpdateProductData = getObjectFilteredByKeyArrayBlackList(curUpdateProductData, ['status'])
      } else {
        this.curUpdateProductData = curUpdateProductData
      }

      this.confirmModalSettings = {
        isWarning: false,
        message: withoutStatus
          ? confirmMessageWithoutStatus
          : confirmMessageByProductStatus[this.curUpdateProductData.status],
        onClickOkBtn: () => this.onSaveProductData(),
      }

      if (this.confirmModalSettings.message) {
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        this.warningModalTitle = warningModalTitleVariants.CHOOSE_STATUS
        this.onTriggerOpenModal('showWarningModal')
      }
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({errorProperty, constraint}) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
            this.alertFailedText = fieldsNotFilledText
          })
        })
      } else {
        console.warn('error ', error)
        this.alertFailedText = undefined
        runInAction(() => {
          this.error = error
        })
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

  async onClickSaveSupplierBtn(supplier, photosOfSupplier) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

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
        runInAction(() => {
          this.suppliers[findSupplierIndex] = supplier
        })
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        await ProductModel.addSuppliersToProduct(this.product._id, [createSupplierResult.guid])
        runInAction(() => {
          this.product.suppliers.push(createSupplierResult.guid)
          this.suppliers.push({...supplier, _id: createSupplierResult.guid})
        })
      }

      this.setActionStatus(loadingStatuses.success)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickParseProductData(productDataParser, product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
      const parseResult = await (() => {
        switch (productDataParser) {
          case ProductDataParser.AMAZON:
            return ResearcherModel.parseAmazon(product.id)
          case ProductDataParser.SELLCENTRAL:
            return ResearcherModel.parseParseSellerCentral(product.id)
        }
      })()
      runInAction(() => {
        this.product = {
          ...this.product,
          ...parseFieldsAdapter(parseResult, productDataParser),
          weight: this.product.weight > parseResult.weight ? this.product.weight : parseResult.weight,
        }
        this.updateAutoCalculatedFields()
      })

      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  // async onForcedSaveSelectedFields(selectedFieldsObj) { //МОЖЕТ ПРИГОДИТСЯ
  //   try {
  //     await ResearcherModel.updateProduct(
  //       this.product._id,
  //       getObjectFilteredByKeyArrayBlackList(selectedFieldsObj, ['suppliers']),
  //     )
  //   } catch (error) {
  //     this.setActionStatus(loadingStatuses.failed)
  //     console.log('error', error)
  //   }
  // }

  async onSaveProductData(editingСontinues) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      await ResearcherModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayBlackList(
          this.curUpdateProductData,
          this.curUpdateProductData.currentSupplierId === null ? ['suppliers', 'currentSupplierId'] : ['suppliers'],
        ),
      )
      this.setActionStatus(loadingStatuses.success)

      this.history.replace('/researcher/product', {product: toJS(this.product), suppliers: toJS(this.suppliers)})

      !editingСontinues && this.history.push('/researcher/products')
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  async onDeleteProduct() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await ResearcherModel.removeProduct(this.product._id)
      this.setActionStatus(loadingStatuses.success)
      this.history.goBack()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerAddOrEditSupplierModal() {
    if (this.showAddOrEditSupplierModal) {
      this.selectedSupplier = undefined
    }
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
