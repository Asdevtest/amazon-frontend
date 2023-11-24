import { transformAndValidate } from 'class-transformer-validator'
import { action, makeAutoObservable, reaction, runInAction } from 'mobx'

import { poundsWeightCoefficient } from '@constants/configs/sizes-settings'
import { ProductDataParser } from '@constants/product/product-data-parser'
import { ProductStatus, ProductStatusByCode, ProductStatusByKey } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { SupervisorModel } from '@models/supervisor-model'
import { SupervisorUpdateProductContract } from '@models/supervisor-model/supervisor-model.contracts'
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
  fieldsOfProductAllowedToUpdate,
  formFieldsDefault,
  warningModalTitleVariants,
} from './supervisor-product-view.constants'

export class SupervisorProductViewModel {
  history = undefined
  requestStatus = undefined

  imagesForLoad = []
  uploadedImages = []

  storekeepersData = []

  product = undefined
  productId = undefined
  productBase = undefined

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  platformSettings = undefined

  supplierModalReadOnly = false

  paymentMethods = []

  weightParserAmazon = 0
  weightParserSELLCENTRAL = 0

  showAddOrEditSupplierModal = false
  curUpdateProductData = {}
  confirmMessage = ''
  warningModalTitle = ''

  selectedSupplier = undefined
  showWarningModal = false
  showConfirmModal = false

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

  setOpenModal = undefined

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickOkBtn: () => this.onSaveProductData(),
  }

  constructor({ history, setOpenModal }) {
    this.history = history

    const url = new URL(window.location.href)
    this.productId = url.searchParams.get('product-id')

    if (setOpenModal) {
      this.setOpenModal = setOpenModal
    }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.productId,
      () => this.loadData(),
    )
  }

  async loadData() {
    try {
      await this.getProductById()
      await this.getProductsVariations()

      const response = await UserModel.getPlatformSettings()
      runInAction(() => {
        this.platformSettings = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getProductsVariations() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await ProductModel.getProductsVariationsByGuid(this.product?.parentProductId || this.product?._id)

      runInAction(() => {
        this.productVariations = result
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getProductById() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await ProductModel.getProductById(this.productId)
      console.log(result)

      runInAction(() => {
        this.product = result
        this.productBase = result
        this.imagesForLoad = result.images

        updateProductAutoCalculatedFields.call(this)
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
  }

  onChangeProductFields = fieldName =>
    action(e => {
      runInAction(() => {
        this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldName]: '' }
      })

      if (
        [
          'checkednotes',
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
        runInAction(() => {
          this.product = { ...this.product, [fieldName]: e.target.value }
        })
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
          runInAction(() => {
            this.product = { ...this.product, [fieldName]: parseInt(e.target.value) }
          })
        } else {
          runInAction(() => {
            this.product = { ...this.product, [fieldName]: e.target.value }
          })
        }
      }

      updateProductAutoCalculatedFields.call(this)
    })

  onClickSetProductStatusBtn(statusKey) {
    if (
      (statusKey === ProductStatus.COMPLETE_SUCCESS ||
        statusKey === ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE ||
        statusKey === ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE) &&
      !this.product.currentSupplierId
    ) {
      if (
        this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE] &&
        this.product.currentSupplierId
      ) {
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
      this.product = { ...this.product, status: ProductStatusByKey[statusKey] }
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepersData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleProductActionButtons(actionType, withoutStatus, isModal, updateDataHandler) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(withoutStatus, updateDataHandler)

        break
      case 'cancel':
        this.history.push('/supervisor/products')
        break

      case 'closeModal':
        this.setOpenModal()
        break
    }
  }

  async openConfirmModalWithTextByStatus(withoutStatus, updateDataHandler) {
    try {
      runInAction(() => {
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
                return (value && parseFloat(value)) || 0
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
      })

      if (withoutStatus) {
        runInAction(() => {
          this.curUpdateProductData = getObjectFilteredByKeyArrayBlackList(this.curUpdateProductData, ['status'])
        })
      }

      await transformAndValidate(SupervisorUpdateProductContract, this.curUpdateProductData)

      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          message: withoutStatus
            ? confirmMessageWithoutStatus()
            : confirmMessageByProductStatus()[this.curUpdateProductData.status],
          onClickOkBtn: () => this.onSaveProductData(updateDataHandler),
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
      this.setRequestStatus(loadingStatuses.failed)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({ errorProperty, constraint }) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
          })
        })
      } else {
        console.log(error)
      }
    }
  }

  async onSaveProductData(updateDataHandler) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      runInAction(() => {
        this.uploadedImages = []
      })

      if (this.imagesForLoad.length) {
        await onSubmitPostImages.call(this, { images: this.imagesForLoad, type: 'uploadedImages' })

        runInAction(() => {
          this.imagesForLoad = []
        })
      }

      const statusesToClearBuyer = [
        ProductStatus.BUYER_FOUND_SUPPLIER,
        ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
        ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,

        ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
        ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
        ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ]

      const checkToBuyerNeedClear =
        ProductStatusByCode[this.curUpdateProductData?.status] === ProductStatus.TO_BUYER_FOR_RESEARCH ||
        (ProductStatusByCode[this.curUpdateProductData?.status] === ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH &&
          statusesToClearBuyer.includes(ProductStatusByCode[this.productBase.status]))

      const dataToUpdate = {
        ...this.curUpdateProductData,
        images: this.uploadedImages,

        buyerId: checkToBuyerNeedClear ? null : this.product.buyer?._id,
      }

      await SupervisorModel.updateProduct(this.product._id, dataToUpdate)

      await this.loadData()
      this.showSuccesAlert()
      updateDataHandler && (await updateDataHandler())

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  showSuccesAlert() {
    this.alertShieldSettings = {
      showAlertShield: true,
      alertShieldMessage: t(TranslationKey['Data was successfully saved']),
    }

    setTimeout(() => {
      this.alertShieldSettings = {
        ...this.alertShieldSettings,
        showAlertShield: false,
      }

      setTimeout(() => {
        this.alertShieldSettings = {
          showAlertShield: false,
          alertShieldMessage: '',
        }
      }, 1000)
    }, 3000)
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickSupplierButtons(actionType) {
    this.getSuppliersPaymentMethods()

    switch (actionType) {
      case 'view':
        this.supplierModalReadOnly = true

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'edit':
        this.supplierModalReadOnly = false

        this.onTriggerAddOrEditSupplierModal()
        break
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

        await this.getStorekeepers()

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

  async onClickParseProductData(product) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
      })

      if (product.asin) {
        const amazonResult = await ProductModel.parseAmazon(product.asin)
        runInAction(() => {
          this.weightParserAmazon = amazonResult.weight || 0
        })

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

              this.imagesForLoad = amazonResult.images
            })
          }
          updateProductAutoCalculatedFields.call(this)
        })

        const sellerCentralResult = await ProductModel.parseParseSellerCentral(product.asin, amazonResult.price)
        runInAction(() => {
          this.weightParserSELLCENTRAL = sellerCentralResult.weight / poundsWeightCoefficient || 0
        })

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

      runInAction(() => {
        this.warningModalTitle = t(TranslationKey['Success parse'])
      })
      this.onTriggerOpenModal('showWarningModal')
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)

      runInAction(() => {
        this.warningModalTitle = t(TranslationKey['Parsing error']) + '\n' + String(error)
      })
      this.onTriggerOpenModal('showWarningModal')
    }
  }

  async navigateToProduct(id) {
    const win = window.open(`/supervisor/products/product?product-id=${id}`, '_blank')
    win.focus()
  }
}
