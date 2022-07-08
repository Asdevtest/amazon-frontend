import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ProductModel} from '@models/product-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {SupervisorModel} from '@models/supervisor-model'
import {SupervisorUpdateProductContract} from '@models/supervisor-model/supervisor-model.contracts'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
import {
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
} from '@utils/checks'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayWhiteList,
  getObjectFilteredByKeyArrayBlackList,
} from '@utils/object'
import {parseFieldsAdapter} from '@utils/parse-fields-adapter'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const fieldsOfProductAllowedToUpdate = [
  'checkednotes',
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

  'niche',
  'asins',
  'avgRevenue',
  'avgBSR',
  'totalRevenue',
  'coefficient',
  'avgPrice',
  'avgReviews',
  // 'totalFba'
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
  updateDate: '',
  _id: '',
  fbaamount: 0,
}

const confirmMessageByProductStatus = () => ({
  15: t(TranslationKey['The product is suitable']) + '?',
  20: t(TranslationKey['The product is not suitable']) + '?',
  30: t(TranslationKey['Send to find a supplier?']),
  70: t(TranslationKey['Publish on the exchange']) + '?',
  80: t(TranslationKey['Supplier not found']) + '?',
  90: t(TranslationKey["The supplier's price is not acceptable?"]),
  230: t(TranslationKey['Send to find a supplier?']),
  250: t(TranslationKey['The product is not suitable']) + '?',
  // 280: t(TranslationKey['Confirm the execution of the Supplier Search request?']),
  280: t(TranslationKey['Supplier not found']) + '?',
  270: t(TranslationKey['Supplier found']) + '?',
  290: t(TranslationKey["Is the supplier's price unacceptable"]) + '?',
})

const confirmMessageWithoutStatus = () => t(TranslationKey['Save without status']) + '?'

const warningModalTitleVariants = () => ({
  NO_SUPPLIER: t(TranslationKey["You can't choose without a supplier"]),
  CHOOSE_STATUS: t(TranslationKey['We need to choose a status']),
  PRICE_WAS_NOT_ACCEPTABLE: t(TranslationKey["Is the supplier's price unacceptable"]),
  SUPPLIER_WAS_NOT_FOUND_BY_BUYER: t(TranslationKey['Supplier not found']),
  ERROR: t(TranslationKey.Error),
})

export class SupervisorProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  imagesForLoad = []
  uploadedImages = []

  storekeepersData = []

  product = undefined
  productId = undefined
  productBase = undefined

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  supplierModalReadOnly = false

  showAddOrEditSupplierModal = false
  curUpdateProductData = {}
  confirmMessage = ''
  warningModalTitle = ''

  drawerOpen = false
  selectedSupplier = undefined
  showWarningModal = false
  showConfirmModal = false

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history

    this.productId = history.location.search.slice(1)

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      await this.getProductById()
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result

        this.productBase = result
        updateProductAutoCalculatedFields.call(this)
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldName]: ''}

      if (
        ['checkednotes', 'niche', 'asins', 'amazonTitle', 'amazonDescription', 'amazonDetail', 'category'].includes(
          fieldName,
        )
      ) {
        this.product = {...this.product, [fieldName]: e.target.value}
      } else {
        if (['weight'].includes(fieldName) && !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(e.target.value, 13)) {
          return
        }
        if (!['weight'].includes(fieldName) && !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(e.target.value, 5)) {
          return
        }
        if (
          ['amazon', 'fbafee', 'avgRevenue', 'coefficient', 'avgPrice', 'reffee', 'totalFba'].includes(fieldName) &&
          !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)
        ) {
          return
        }
        if (['bsr', 'fbaamount', 'avgBSR', 'totalRevenue', 'avgReviews'].includes(fieldName) && e.target.value !== '') {
          this.product = {...this.product, [fieldName]: parseInt(e.target.value)}
        } else {
          this.product = {...this.product, [fieldName]: e.target.value}
        }
      }

      updateProductAutoCalculatedFields.call(this)
    })

  onClickSetProductStatusBtn(statusKey) {
    if (
      statusKey === ProductStatus.COMPLETE_SUCCESS &&
      (!this.product.currentSupplierId ||
        this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE] ||
        this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER])
    ) {
      if (this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE]) {
        this.warningModalTitle = warningModalTitleVariants().PRICE_WAS_NOT_ACCEPTABLE
      } else if (this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER]) {
        this.warningModalTitle = warningModalTitleVariants().SUPPLIER_WAS_NOT_FOUND_BY_BUYER
      } else if (!this.product.currentSupplierId) {
        this.warningModalTitle = warningModalTitleVariants().NO_SUPPLIER
      } else {
        this.warningModalTitle = warningModalTitleVariants().ERROR
      }

      this.onTriggerOpenModal('showWarningModal')
    } else {
      this.product = {...this.product, status: ProductStatusByKey[statusKey]}
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      this.storekeepersData = result
    } catch (error) {
      console.log(error)
    }
  }

  async handleProductActionButtons(actionType, withoutStatus) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(withoutStatus)

        break
      case 'cancel':
        this.history.push('/supervisor/products')
        break
    }
  }

  async openConfirmModalWithTextByStatus(withoutStatus) {
    try {
      this.curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
        this.product,
        fieldsOfProductAllowedToUpdate,
        false,
        (key, value) => {
          switch (key) {
            case 'checkednotes':
              return value || ''
            case 'bsr':
              return (value && parseInt(value)) || 0
            case 'amazon':
              return value && parseFloat(value)
            case 'weight':
              return value && parseFloat(value)
            case 'length':
              return value && parseFloat(value)
            case 'width':
              return value && parseFloat(value)
            case 'height':
              return value && parseFloat(value)
            case 'fbaamount':
              return value && parseFloat(value)
            case 'reffee':
              return value && parseFloat(value)
            case 'fbafee':
              return value && parseFloat(value)
            case 'profit':
              return value && parseFloat(value)
            case 'totalFba':
              return value && parseFloat(value)
            default:
              return value
          }
        },
      )
      if (withoutStatus) {
        this.curUpdateProductData = getObjectFilteredByKeyArrayBlackList(this.curUpdateProductData, ['status'])
      }

      await transformAndValidate(SupervisorUpdateProductContract, this.curUpdateProductData)

      this.confirmMessage = withoutStatus
        ? confirmMessageWithoutStatus()
        : confirmMessageByProductStatus()[this.curUpdateProductData.status]

      if (this.confirmMessage) {
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        this.warningModalTitle = warningModalTitleVariants().CHOOSE_STATUS
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

      if (this.imagesForLoad.length) {
        await onSubmitPostImages.call(this, {images: this.imagesForLoad, type: 'uploadedImages'})
        this.imagesForLoad = []
      }

      await SupervisorModel.updateProduct(this.product._id, {
        ...this.curUpdateProductData,
        images: this.uploadedImages.length
          ? [...this.curUpdateProductData.images, ...this.uploadedImages]
          : this.curUpdateProductData.images,
      })
      this.setActionStatus(loadingStatuses.success)

      this.history.push('/supervisor/products')
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  async onClickSupplierButtons(actionType) {
    switch (actionType) {
      case 'view':
        this.supplierModalReadOnly = true

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'edit':
        runInAction(() => {
          this.supplierModalReadOnly = false
        })

        this.onTriggerAddOrEditSupplierModal()
        break
    }
  }

  async onRemoveSupplier() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      await ProductModel.removeSuppliersFromProduct(this.product._id, [this.selectedSupplier._id])
      this.setActionStatus(loadingStatuses.success)
      const findProductSupplierIndex = this.product.suppliers.findIndex(
        supplierItem => supplierItem._id === this.selectedSupplier._id,
      )
      runInAction(() => {
        this.product.suppliers.splice(findProductSupplierIndex, 1)
        this.selectedSupplier = undefined
        this.onSaveProductData()
      })

      this.loadData()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        this.selectedSupplier = undefined
      } else {
        const result = await UserModel.getPlatformSettings()

        await this.getStorekeepers()

        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      }

      this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
    } catch (error) {
      console.log(error)
    }
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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async onClickParseProductData(productDataParser, product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
      if (product.asin) {
        const parseResult = await (() => {
          switch (productDataParser) {
            case ProductDataParser.AMAZON:
              return ProductModel.parseAmazon(product.asin)
            case ProductDataParser.SELLCENTRAL:
              return ProductModel.parseParseSellerCentral(product.asin)
          }
        })()

        runInAction(() => {
          if (Object.keys(parseResult).length > 5) {
            // проверка, что ответ не пустой (иначе приходит объект {length: 2})
            this.product = {
              ...this.product,
              ...parseFieldsAdapter(parseResult, productDataParser),
              weight: this.product.weight > parseResult.weight ? this.product.weight : parseResult.weight,
              amazonDescription: parseResult.info?.description || this.product.amazonDescription,
              amazonDetail: parseResult.info?.detail || this.product.amazonDetail,
            }
          }
          updateProductAutoCalculatedFields.call(this)
        })
      } else {
        this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, asin: 'Пустой асин!'}
      }

      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }
}
