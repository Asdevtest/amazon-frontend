import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ProductModel} from '@models/product-model'
import {ResearcherModel} from '@models/researcher-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
import {
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
} from '@utils/checks'
import {
  getObjectFilteredByKeyArrayWhiteList,
  getObjectFilteredByKeyArrayBlackList,
  getNewObjectWithDefaultValue,
} from '@utils/object'
import {parseFieldsAdapter} from '@utils/parse-fields-adapter'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const fieldsOfProductAllowedToForceUpdate = [
  'lamazon',
  'lsupplier',
  'bsr',
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
]

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

  'niche',
  'asins',
  'avgRevenue',
  'avgBSR',
  'totalRevenue',
  'coefficient',
  'avgPrice',
  'avgReviews',
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
  asin: '',
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

const fieldsNotFilledText = () => t(TranslationKey['Fields not filled in'])

const warningModalTitleVariants = () => ({
  NO_SUPPLIER: t(TranslationKey["You can't choose without a supplier"]),
  CHOOSE_STATUS: t(TranslationKey['We need to choose a status']),
})

const confirmMessageByProductStatus = () => ({
  5: t(TranslationKey['Send to the Supervisor for review']) + '?',
  10: t(TranslationKey['Send to check with the supplier']) + '?',
})

const confirmMessageWithoutStatus = () => t(TranslationKey['Save without status']) + '?'

export class ResearcherProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined
  alertFailedText = undefined

  productId = undefined
  product = undefined
  productBase = undefined
  curUpdateProductData = {}
  imagesForLoad = []
  uploadedImages = []

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  startParse = false

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showConfirmModal = false
  showWarningModal = false

  warningModalTitle = ''

  confirmModalSettings = {
    isWarning: false,
    message: t(TranslationKey['The product will be sent to Supervisor for review. Are you sure?']),
    onClickOkBtn: () => this.onSaveProductData(),
  }

  readyImages = []
  progressValue = 0
  showProgress = false

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history, location}) {
    this.history = history

    if (location.state) {
      this.startParse = location.state.startParse
    }

    this.productId = history.location.search.slice(1)
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      await this.getProductById()

      if (this.startParse) {
        this.onClickParseProductData(ProductDataParser.AMAZON, this.product)

        this.onClickParseProductData(ProductDataParser.SELLCENTRAL, this.product)
        this.startParse = false
      }
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
      if (
        ['icomment', 'niche', 'asins', 'amazonTitle', 'amazonDescription', 'amazonDetail', 'category'].includes(
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
          ['amazon', 'fbafee', 'avgRevenue', 'coefficient', 'avgPrice'].includes(fieldName) &&
          !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)
        ) {
          return
        }

        if (['strategyStatus'].includes(fieldName)) {
          this.product = {...this.product, [fieldName]: e.target.value}

          this.product = {...this.product, status: this.productBase.status}
        }

        if (['fbaamount', 'avgBSR', 'totalRevenue', 'avgReviews'].includes(fieldName) && e.target.value !== '') {
          this.product = {...this.product, [fieldName]: parseInt(e.target.value)}
        } else {
          this.product = {...this.product, [fieldName]: e.target.value}
        }
      }

      if (['bsr', 'express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba'].includes(fieldName)) {
        updateProductAutoCalculatedFields.call(this)
      }
    })

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
        this.product = {...this.product, currentSupplierId: this.selectedSupplier._id}
        this.product = {...this.product, currentSupplier: this.selectedSupplier}
        this.selectedSupplier = undefined
        updateProductAutoCalculatedFields.call(this)
        break
      case 'acceptRevoke':
        this.product = {...this.product, currentSupplierId: null}
        this.product = {...this.product, currentSupplier: undefined}
        this.selectedSupplier = undefined
        updateProductAutoCalculatedFields.call(this)
        break
      case 'delete':
        this.confirmModalSettings = {
          isWarning: true,
          message: t(TranslationKey['Are you sure you want to remove the supplier?']),
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

      runInAction(() => {
        this.product.suppliers
        this.selectedSupplier = undefined

        if (this.product.currentSupplierId && this.product.currentSupplierId === this.selectedSupplier._id) {
          this.product.currentSupplierId = undefined
        }
      })

      this.onSaveForceProductData()
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
          message: t(TranslationKey['Are you sure you want to remove the product?']),
          onClickOkBtn: () => this.onDeleteProduct(),
        }

        this.onTriggerOpenModal('showConfirmModal')

        break
    }
  }

  onClickSetProductStatusBtn(statusKey) {
    if (statusKey === ProductStatus.RESEARCHER_FOUND_SUPPLIER && !this.product.currentSupplierId) {
      this.warningModalTitle = warningModalTitleVariants().NO_SUPPLIER

      this.onTriggerOpenModal('showWarningModal')
    } else {
      this.product = {...this.product, status: ProductStatusByKey[statusKey]}
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
              return (value && parseFloat(value)) || 0
            case 'weight':
              return (value && parseFloat(value)) || 0
            case 'length':
              return (value && parseFloat(value)) || 0
            case 'width':
              return (value && parseFloat(value)) || 0
            case 'height':
              return (value && parseFloat(value)) || 0
            case 'fbaamount':
              return (value && parseFloat(value)) || 0
            case 'fbafee':
              return (value && parseFloat(value)) || 0
            case 'profit':
              return value && parseFloat(value)
            case 'currentSupplier':
              return this.product.currentSupplier._id
            default:
              return value
          }
        },
      )

      // await transformAndValidate(ResearcherUpdateProductContract, curUpdateProductData) // пока убрали валидацию

      if (withoutStatus) {
        this.curUpdateProductData = getObjectFilteredByKeyArrayBlackList(curUpdateProductData, ['status'])
      } else {
        this.curUpdateProductData = curUpdateProductData
      }

      this.confirmModalSettings = {
        isWarning: false,
        message: withoutStatus
          ? confirmMessageWithoutStatus()
          : confirmMessageByProductStatus()[this.curUpdateProductData.status],
        onClickOkBtn: () => this.onSaveProductData(),
      }

      if (this.confirmModalSettings.message) {
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
            this.alertFailedText = fieldsNotFilledText()
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

  async onClickSaveSupplierBtn(supplier, photosOfSupplier) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      this.readyImages = []

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, {images: photosOfSupplier, type: 'readyImages'})
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        lotcost: parseFloat(supplier?.lotcost) || '',
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: supplier.images.concat(this.readyImages),
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, ['_id'])
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)

        if (supplier._id === this.product.currentSupplierId) {
          this.product.currentSupplier = supplier
          updateProductAutoCalculatedFields.call(this)
        }
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        await ProductModel.addSuppliersToProduct(this.product._id, [createSupplierResult.guid])
        runInAction(() => {
          this.product.suppliers.push(createSupplierResult.guid)
        })
      }

      this.onSaveForceProductData()
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

      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
  }

  async onSaveProductData(editingСontinues) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      if (this.imagesForLoad.length) {
        await onSubmitPostImages.call(this, {images: this.imagesForLoad, type: 'uploadedImages'})
        this.imagesForLoad = []
      }

      await ResearcherModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            ...this.curUpdateProductData,
            images: this.uploadedImages.length
              ? [...this.curUpdateProductData.images, ...this.uploadedImages]
              : this.curUpdateProductData.images,
          },
          ['suppliers'],
        ),
      )
      this.setActionStatus(loadingStatuses.success)

      !editingСontinues && this.history.push('/researcher/products')
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  async onSaveForceProductData() {
    try {
      await ResearcherModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayWhiteList(
          toJS(this.product),
          fieldsOfProductAllowedToForceUpdate,
          true,
          (key, value) => {
            switch (key) {
              case 'bsr':
                return (value && parseInt(value)) || 0
              case 'amazon':
                return (value && parseFloat(value)) || 0
              case 'weight':
                return (value && parseFloat(value)) || 0
              case 'length':
                return (value && parseFloat(value)) || 0
              case 'width':
                return (value && parseFloat(value)) || 0
              case 'height':
                return (value && parseFloat(value)) || 0
              case 'fbaamount':
                return (value && parseFloat(value)) || 0
              case 'fbafee':
                return (value && parseFloat(value)) || 0
              case 'profit':
                return (value && parseFloat(value)) || 0
              default:
                return value
            }
          },
        ),
      )

      this.loadData()
    } catch (error) {
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

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        this.selectedSupplier = undefined
      } else {
        const result = await UserModel.getPlatformSettings()

        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      }

      this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
    } catch (error) {
      console.log(error)
    }
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
