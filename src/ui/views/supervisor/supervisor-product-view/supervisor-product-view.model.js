import { transformAndValidate } from 'class-transformer-validator'
import { action, makeAutoObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { poundsWeightCoefficient } from '@constants/configs/sizes-settings'
import { ProductDataParser } from '@constants/product/product-data-parser'
import { ProductStatus, ProductStatusByCode, ProductStatusByKey } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductModel } from '@models/product-model'
import { SupervisorModel } from '@models/supervisor-model'
import { SupervisorUpdateProductContract } from '@models/supervisor-model/supervisor-model.contracts'
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

import { loadingStatus } from '@typings/enums/loading-status'

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

  product = undefined
  productId = undefined
  productBase = undefined

  weightParserAmazon = 0
  weightParserSELLCENTRAL = 0

  curUpdateProductData = undefined
  confirmMessage = ''

  showConfirmModal = false

  formFields = { ...formFieldsDefault }

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  get currentData() {
    return this.product
  }

  setOpenModal = undefined

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
    } catch (error) {
      console.error(error)
    }
  }

  async getProductsVariations() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await ProductModel.getProductsVariationsByGuid(this.product?.parentProductId || this.product?._id)

      runInAction(() => {
        this.productVariations = result
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getProductById() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result
        this.productBase = result
        this.imagesForLoad = result.images

        updateProductAutoCalculatedFields.call(this)
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldName]: '' }

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
        if (['bsr', 'fbaamount', 'avgBSR', 'totalRevenue', 'avgReviews'].includes(fieldName) && e.target.value !== '') {
          this.product = { ...this.product, [fieldName]: parseInt(e.target.value) }
        } else {
          this.product = { ...this.product, [fieldName]: e.target.value }
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
        toast.warning(warningModalTitleVariants().PRICE_WAS_NOT_ACCEPTABLE)
      } else if (this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER]) {
        toast.warning(warningModalTitleVariants().SUPPLIER_WAS_NOT_FOUND_BY_BUYER)
      } else if (!this.product.currentSupplierId) {
        toast.warning(warningModalTitleVariants().NO_SUPPLIER)
      } else {
        toast.warning(warningModalTitleVariants().ERROR)
      }
    } else {
      this.product = { ...this.product, status: ProductStatusByKey[statusKey] }
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
        toast.warning(warningModalTitleVariants().CHOOSE_STATUS)
      }
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({ errorProperty, constraint }) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
          })
        })
      } else {
        console.error(error)
      }
    }
  }

  async onSaveProductData(updateDataHandler) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await onSubmitPostImages.call(this, { images: this.imagesForLoad, type: 'uploadedImages' })

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

      this.setOpenModal()

      this.loadData()

      updateDataHandler && (await updateDataHandler())

      UserModel.getUsersInfoCounters()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
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
      this.setRequestStatus(loadingStatus.IS_LOADING)
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
          }
          updateProductAutoCalculatedFields.call(this)
        })

        const sellerCentralResult = await ProductModel.parseParseSellerCentral(product.asin, amazonResult.price)
        runInAction(() => {
          this.weightParserSELLCENTRAL = sellerCentralResult.weight / poundsWeightCoefficient || 0
        })

        runInAction(() => {
          if (Object.keys(sellerCentralResult).length > 5) {
            // проверка, что ответ не пустой (иначе приходит объект {length: 2})

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
          }
          updateProductAutoCalculatedFields.call(this)
        })
      } else {
        runInAction(() => {
          this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, asin: t(TranslationKey['No ASIN']) }
        })
      }

      toast.success(t(TranslationKey['Success parse']))

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)

      toast.error(t(TranslationKey['Parsing error']) + '\n' + String(error))
    }
  }

  async navigateToProduct(id) {
    const win = window.open(`/supervisor/products/product?product-id=${id}`, '_blank')
    win.focus()
  }
}
