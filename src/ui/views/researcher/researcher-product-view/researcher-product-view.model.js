import { action, makeAutoObservable, runInAction, toJS } from 'mobx'

import { poundsWeightCoefficient } from '@constants/configs/sizes-settings'
import { ProductDataParser } from '@constants/product/product-data-parser'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { ProductModel } from '@models/product-model'
import { ResearcherModel } from '@models/researcher-model'
import { SettingsModel } from '@models/settings-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import {
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
} from '@utils/checks'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayBlackList,
  getObjectFilteredByKeyArrayWhiteList,
} from '@utils/object'
import { parseFieldsAdapter } from '@utils/parse-fields-adapter'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'
import { isValidationErrors, plainValidationErrorAndApplyFuncForEachError } from '@utils/validation'

import {
  confirmMessageByProductStatus,
  confirmMessageWithoutStatus,
  fieldsNotFilledText,
  fieldsOfProductAllowedToForceUpdate,
  fieldsOfProductAllowedToUpdate,
  formFieldsDefault,
  warningModalTitleVariants,
} from './researcher-product-view.constant'

export class ResearcherProductViewModel {
  history = undefined
  requestStatus = undefined

  alertFailedText = undefined

  productId = undefined
  product = undefined
  productBase = undefined
  curUpdateProductData = {}
  imagesForLoad = []
  uploadedImages = []

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined
  platformSettings = undefined

  supplierModalReadOnly = false

  startParse = false

  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showConfirmModal = false
  showWarningModal = false

  weightParserAmazon = 0
  weightParserSELLCENTRAL = 0

  warningModalTitle = ''

  confirmModalSettings = {
    isWarning: false,
    message: t(TranslationKey['The product will be sent to Supervisor for review. Are you sure?']),
    onClickOkBtn: () => this.onSaveProductData(),
  }

  readyImages = []
  progressValue = 0
  showProgress = false

  formFields = formFieldsDefault

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  get currentData() {
    return this.product
  }

  constructor({ history }) {
    this.history = history

    if (history.location.state) {
      this.startParse = history.location.state.startParse
    }

    this.productId = history.location.search.slice(1)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      await this.getProductById()

      const response = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.platformSettings = response
      })

      if (this.startParse) {
        this.onClickParseProductData(this.product)

        runInAction(() => {
          this.startParse = false
        })
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
        this.imagesForLoad = result.images

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
      this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldName]: '' }

      if (
        [
          'icomment',
          'niche',
          'asins',
          'amazonTitle',
          'amazonDescription',
          'amazonDetail',
          'category',
          'redFlags',
          'tags',
        ].includes(fieldName)
      ) {
        this.product = { ...this.product, [fieldName]: e.target.value }
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

        if (['strategyStatus'].includes(fieldName)) {
          this.product = { ...this.product, [fieldName]: e.target.value, status: this.productBase.status }
        }

        if (['fbaamount', 'avgBSR', 'totalRevenue', 'avgReviews'].includes(fieldName) && e.target.value !== '') {
          this.product = { ...this.product, [fieldName]: parseInt(e.target.value) }
        } else {
          this.product = { ...this.product, [fieldName]: e.target.value }
        }
      }

      if (['bsr', 'express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba', 'reffee'].includes(fieldName)) {
        updateProductAutoCalculatedFields.call(this)
      }
    })

  async onClickSupplierButtons(actionType) {
    switch (actionType) {
      case 'add':
        runInAction(() => {
          this.selectedSupplier = undefined
          this.supplierModalReadOnly = false
        })

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'view':
        runInAction(() => {
          this.supplierModalReadOnly = true
        })

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'edit':
        runInAction(() => {
          this.supplierModalReadOnly = false
        })

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'accept':
        runInAction(() => {
          this.product = { ...this.product, currentSupplierId: this.selectedSupplier._id }
          this.product = { ...this.product, currentSupplier: this.selectedSupplier }
          this.selectedSupplier = undefined
        })
        updateProductAutoCalculatedFields.call(this)

        this.onSaveForceProductData()
        break
      case 'acceptRevoke':
        runInAction(() => {
          this.product = { ...this.product, currentSupplierId: null }
          this.product = { ...this.product, currentSupplier: undefined }
          this.selectedSupplier = undefined
        })
        updateProductAutoCalculatedFields.call(this)

        this.onSaveForceProductData()
        break
      case 'delete':
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            message: t(TranslationKey['Are you sure you want to remove the supplier?']),
            onClickOkBtn: () => this.onRemoveSupplier(),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }

  async onRemoveSupplier(supplierId) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await ProductModel.removeSuppliersFromProduct(this.product._id, [supplierId])

      if (this.product.currentSupplierId && this.product.currentSupplierId === supplierId) {
        runInAction(() => {
          this.product.currentSupplierId = null
        })
      }

      this.onSaveForceProductData()

      runInAction(() => {
        this.product.suppliers
      })

      await SupplierModel.removeSupplier(supplierId)

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
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
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            message: t(TranslationKey['Are you sure you want to remove the product?']),
            onClickOkBtn: () => this.onDeleteProduct(),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')

        break
    }
  }

  onClickSetProductStatusBtn(statusKey) {
    if (statusKey === ProductStatus.RESEARCHER_FOUND_SUPPLIER && !this.product.currentSupplierId) {
      this.warningModalTitle = warningModalTitleVariants().NO_SUPPLIER

      this.onTriggerOpenModal('showWarningModal')
    } else {
      this.product = { ...this.product, status: ProductStatusByKey[statusKey] }
    }
  }

  async openConfirmModalWithTextByStatus(withoutStatus) {
    try {
      runInAction(() => {
        this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
      })

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

            case 'totalFba':
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

      runInAction(() => {
        if (withoutStatus) {
          this.curUpdateProductData = getObjectFilteredByKeyArrayBlackList(curUpdateProductData, ['status'])
        } else {
          this.curUpdateProductData = curUpdateProductData
        }
      })

      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          message: withoutStatus
            ? confirmMessageWithoutStatus()
            : confirmMessageByProductStatus()[this.curUpdateProductData.status],
          onClickOkBtn: () => this.onSaveProductData(),
        }
      })

      if (this.confirmModalSettings.message) {
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        runInAction(() => {
          this.warningModalTitle = warningModalTitleVariants().CHOOSE_STATUS
        })
        this.onTriggerOpenModal('showWarningModal')
      }
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({ errorProperty, constraint }) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
            this.alertFailedText = fieldsNotFilledText()
          })
        })
      } else {
        console.warn(error)
      }
    }
  }

  async onClickSaveSupplierBtn({ supplier, photosOfSupplier, editPhotosOfSupplier }) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      this.clearReadyImages()

      if (editPhotosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: this.readyImages,
      }

      this.clearReadyImages()

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: photosOfSupplier, type: 'readyImages' })
        supplier = {
          ...supplier,
          images: [...supplier.images, ...this.readyImages],
        }
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(supplier, patchSuppliers)
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)

        if (supplier._id === this.product.currentSupplierId) {
          this.product.currentSupplier = supplier
          updateProductAutoCalculatedFields.call(this)
        }
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)
        await ProductModel.addSuppliersToProduct(this.product._id, [createSupplierResult.guid])
        runInAction(() => {
          this.product.suppliers.push(createSupplierResult.guid)
        })
      }

      this.onSaveForceProductData()
      this.setRequestStatus(loadingStatuses.SUCCESS)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onClickParseProductData(product) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      runInAction(() => {
        this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
      })

      if (product.asin) {
        const amazonResult = await ProductModel.parseAmazon(product.asin)
        this.weightParserAmazon = amazonResult.weight || 0

        if (!amazonResult.price) {
          throw new Error('price <= 0')
        }

        runInAction(() => {
          if (Object.keys(amazonResult).length > 5) {
            // проверка, что ответ не пустой (иначе приходит объект {length: 2})
            runInAction(() => {
              this.product = {
                ...this.product,
                ...parseFieldsAdapter(amazonResult, ProductDataParser.AMAZON),
                weight:
                  this.product.weight > Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL)
                    ? this.product.weight
                    : Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL),

                amazonDescription: amazonResult.info?.description || this.product.amazonDescription,
                amazonDetail: amazonResult.info?.detail || this.product.amazonDetail,
                // fbafee: this.product.fbafee,
              }
            })

            this.imagesForLoad = amazonResult.images
          }
          updateProductAutoCalculatedFields.call(this)
        })

        const sellerCentralResult = await ProductModel.parseParseSellerCentral(product.asin, amazonResult.price)
        this.weightParserSELLCENTRAL = sellerCentralResult.weight / poundsWeightCoefficient || 0

        if (!sellerCentralResult.amazonFee) {
          throw new Error('fbafee <= 0')
        }

        runInAction(() => {
          if (Object.keys(sellerCentralResult).length > 5) {
            // проверка, что ответ не пустой (иначе приходит объект {length: 2})
            runInAction(() => {
              this.product = {
                ...this.product,
                ...parseFieldsAdapter(sellerCentralResult, ProductDataParser.SELLCENTRAL),
                weight:
                  this.product.weight > Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL)
                    ? this.product.weight
                    : Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL),

                amazonDescription: sellerCentralResult.info?.description || this.product.amazonDescription,
                amazonDetail: sellerCentralResult.info?.detail || this.product.amazonDetail,
                // fbafee: this.product.fbafee,
              }
            })
          }
          updateProductAutoCalculatedFields.call(this)
        })
      } else {
        runInAction(() => {
          this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, asin: t(TranslationKey['No ASIN']) }
        })
      }

      this.warningModalTitle = t(TranslationKey['Success parse'])
      this.onTriggerOpenModal('showWarningModal')
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)

      this.warningModalTitle = t(TranslationKey['Parsing error']) + '\n' + String(error)
      this.onTriggerOpenModal('showWarningModal')
    }
  }

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
  }

  async onSaveProductData(editingСontinues) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      runInAction(() => {
        this.uploadedImages = []
      })

      if (this.imagesForLoad?.length) {
        await onSubmitPostImages.call(this, { images: this.imagesForLoad, type: 'uploadedImages' })
        this.imagesForLoad = []
      }

      await ResearcherModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            ...this.curUpdateProductData,
            images: this.uploadedImages,
          },
          ['suppliers'],
        ),
      )
      this.setRequestStatus(loadingStatuses.SUCCESS)

      !editingСontinues && this.history.push('/researcher/products')
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
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
      console.log(error)
    }
  }

  async onDeleteProduct() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      await ResearcherModel.removeProduct(this.product._id)
      this.setRequestStatus(loadingStatuses.SUCCESS)
      this.history.goBack()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        runInAction(() => {
          this.selectedSupplier = undefined
        })
      } else {
        const result = await UserModel.getPlatformSettings()

        runInAction(() => {
          this.yuanToDollarRate = result.yuanToDollarRate
          this.volumeWeightCoefficient = result.volumeWeightCoefficient
        })
      }
      runInAction(() => {
        this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
      })
    } catch (error) {
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  clearReadyImages() {
    this.readyImages = []
  }
}
