import { action, makeAutoObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { poundsWeightCoefficient } from '@constants/configs/sizes-settings'
import { ProductDataParser } from '@constants/product/product-data-parser'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { ProductModel } from '@models/product-model'
import { ShopModel } from '@models/shop-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import {
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
} from '@utils/checks'
import { addIdDataConverter } from '@utils/data-grid-data-converters'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayBlackList,
  getObjectFilteredByKeyArrayWhiteList,
} from '@utils/object'
import { parseFieldsAdapter } from '@utils/parse-fields-adapter'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { ProductVariation } from '@typings/enums/product/product-variation'

import { fieldsOfProductAllowedToUpdate, formFieldsDefault } from './client-product-view.constants'

export class ClientProductViewModel {
  history = undefined
  requestStatus = undefined
  updateDataHandler = undefined

  get currentData() {
    return this.product
  }

  product = undefined
  productBase = undefined
  productId = undefined
  productVariations = undefined
  productsToBind = undefined

  shopsData = []

  curUpdateProductData = undefined

  paymentMethods = []

  showConfirmModal = false
  showBindProductModal = false

  showTab = undefined

  setOpenModal = undefined

  weightParserAmazon = 0
  weightParserSELLCENTRAL = 0

  confirmModalSettings = {
    isWarning: false,
    title: '',
    message: '',
    successBtnText: '',
    cancelBtnText: '',
    onClickOkBtn: () => this.onSaveProductData(),
  }

  imagesForLoad = []
  uploadedImages = []

  readyImages = []
  progressValue = 0
  showProgress = false
  isValidLink = true

  formFields = formFieldsDefault

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history, setOpenModal, updateDataHandler }) {
    this.history = history
    this.updateDataHandler = updateDataHandler

    const url = new URL(window.location.href)
    this.productId = url.searchParams.get('product-id')
    this.showTab = url.searchParams.get('show-tab')

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
      await this.getShops()
      await this.getProductsVariations()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickGetProductsToBind(option) {
    try {
      const result = await ClientModel.getProductPermissionsData(
        option === ProductVariation.PARENT
          ? { isChild: false, offset: 0 }
          : { isChild: false, isParent: false, shopId: this.product?.shopId, offset: 0 },
      )

      runInAction(() => {
        this.productsToBind = result.rows
      })
    } catch (error) {
      console.error(error)
    }
  }

  async bindUnbindProducts(option, products) {
    try {
      if (option === ProductVariation.CHILD) {
        await ProductModel.unbindProducts({
          parentProductId: this.product?._id,
          childProductIds: products?.map(product => product?._id),
        })
      } else {
        await ProductModel.unbindProducts({
          parentProductId: products?.[0]?._id,
          childProductIds: [this.product?._id],
        })
      }

      this.loadData()
      this.onTriggerOpenModal('showBindProductModal')
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

  unbindProductHandler(childProductIds) {
    this.confirmModalSettings = {
      isWarning: true,
      title: t(TranslationKey['Product unbundling']),
      message: t(TranslationKey['Are you sure you want to unbind the product?']),
      successBtnText: t(TranslationKey.Yes),
      cancelBtnText: t(TranslationKey.Cancel),
      onClickOkBtn: () => this.unbindProduct(childProductIds),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async unbindProduct(childProductIds) {
    try {
      await ProductModel.unbindProducts({
        parentProductId: null,
        childProductIds: [childProductIds],
      })

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async navigateToProduct(id) {
    const win = window.open(`/client/inventory/product?product-id=${id}`, '_blank')
    win.focus()
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

  onChangeProductFields = fieldName =>
    action(e => {
      this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldName]: '' }

      if (
        [
          'icomment',
          'category',
          'lamazon',
          'clientComment',
          'amazonTitle',
          'amazonDescription',
          'amazonDetail',
          'skuByClient',
          'niche',
          'asins',
          'shopId',
          'redFlags',
          'tags',
        ].includes(fieldName)
      ) {
        this.product = { ...this.product, [fieldName]: e.target.value }
      } else {
        if (fieldName === 'transparency') {
          this.product = { ...this.product, [fieldName]: e }
          this.patchProductTransparencyHandler()
          this.updateDataHandler?.()
          return
        }

        if (['asin'].includes(fieldName)) {
          this.product = { ...this.product, [fieldName]: e.target.value.replace(/[^0-9a-zA-Z]/g, '') }
        }

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

        if (['fbaamount', 'avgBSR', 'totalRevenue', 'avgReviews'].includes(fieldName) && e.target.value !== '') {
          this.product[fieldName] = parseInt(e.target.value)
        }

        this.product = { ...this.product, [fieldName]: e.target.value }
      }

      if (['bsr', 'express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba', 'reffee'].includes(fieldName)) {
        runInAction(() => {
          updateProductAutoCalculatedFields.call(this)
        })
      }
    })

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async handleProductActionButtons(actionType, withoutStatus, isModal, updateDataHandler) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(withoutStatus, updateDataHandler)
        break
      case 'cancel':
        this.product.archive
          ? this.history.push(`/client/inventory/archive?isArchive=${this.product.archive}`)
          : this.history.push('/client/inventory')
        break
      case 'delete':
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            title: t(TranslationKey['Delete a card']),
            message: t(TranslationKey['After confirmation, the card will be moved to the archive. Move?']),
            successBtnText: t(TranslationKey.Delete),
            cancelBtnText: t(TranslationKey.Cancel),
            onClickOkBtn: () => this.onDeleteProduct(isModal, updateDataHandler),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')

        break

      case 'restore':
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: false,
            title: t(TranslationKey['Return to Inventory']),
            message: t(TranslationKey['After confirmation, the card will be moved to the Inventory. Continue?']),
            successBtnText: t(TranslationKey.Yes),
            cancelBtnText: t(TranslationKey.Cancel),
            onClickOkBtn: () => this.onRestoreProduct(isModal, updateDataHandler),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')

        break
      case 'closeModal':
        this.setOpenModal()
        break
    }
  }

  async onRestoreProduct(isModal, updateDataHandler) {
    try {
      await ClientModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayWhiteList({ ...this.product, archive: false }, ['archive']),
      )

      await updateDataHandler()

      if (isModal) {
        this.setOpenModal()
      } else {
        this.history.goBack()
      }
    } catch (error) {
      console.error(error)
    }
  }

  async onDeleteProduct(isModal, updateDataHandler) {
    try {
      await ClientModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayWhiteList({ ...this.product, archive: true }, ['archive']),
      )

      await updateDataHandler()

      if (isModal) {
        this.setOpenModal()
      } else {
        this.history.goBack()
      }
    } catch (error) {
      console.error(error)
    }
  }

  async openConfirmModalWithTextByStatus(withoutStatus, updateDataHandler) {
    try {
      runInAction(() => {
        this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
      })

      const curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
        this.product,
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
        true,
      )

      if (withoutStatus) {
        runInAction(() => {
          this.curUpdateProductData = getObjectFilteredByKeyArrayBlackList(curUpdateProductData, ['status'])
        })
      } else {
        runInAction(() => {
          this.curUpdateProductData = curUpdateProductData
        })
      }

      await this.onSaveProductData()
      updateDataHandler && (await updateDataHandler())
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onSaveProductData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await onSubmitPostImages.call(this, { images: this.imagesForLoad, type: 'uploadedImages' })

      await ClientModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            ...this.curUpdateProductData,
            images: this.uploadedImages,
          },
          ['suppliers'],
          undefined,
          undefined,
          true,
        ),
      )
      this.getProductById()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveSupplierBtn({ supplier, itemId, editPhotosOfSupplier, editPhotosOfUnit }) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        heightUnit: supplier?.heightUnit || null,
        widthUnit: supplier?.widthUnit || null,
        lengthUnit: supplier?.lengthUnit || null,
        weighUnit: supplier?.weighUnit || null,
        boxProperties: supplier?.boxProperties
          ? supplier.boxProperties
          : {
              amountInBox: null,
              boxHeightCm: null,
              boxLengthCm: null,
              boxWeighGrossKg: null,
              boxWidthCm: null,
            },
      }

      await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })
      supplier = {
        ...supplier,
        images: this.readyImages,
      }

      await onSubmitPostImages.call(this, { images: editPhotosOfUnit, type: 'readyImages' })
      supplier = {
        ...supplier,
        imageUnit: this.readyImages,
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(
          supplier,
          patchSuppliers,
          undefined,
          undefined,
          true,
        )

        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)

        if (supplier._id === this.product.currentSupplierId) {
          runInAction(() => {
            this.product.currentSupplier = supplier
            updateProductAutoCalculatedFields.call(this)
          })
        }
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

        await ProductModel.addSuppliersToProduct(itemId, [createSupplierResult.guid])
        await this.getProductById()
      }

      await this.onSaveForceProductData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onSaveForceProductData(product) {
    try {
      await ClientModel.updateProduct(
        this.productId,
        getObjectFilteredByKeyArrayWhiteList(
          product || this.product,
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
              default:
                return value
            }
          },
          true,
        ),
      )

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async patchProductTransparencyHandler() {
    try {
      await ClientModel.patchProductTransparency(this.productId, {
        transparency: this.product.transparency,
      })
    } catch (error) {
      console.error(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async onClickParseProductData(product) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      runInAction(() => {
        this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
      })

      if (!product.asin) {
        runInAction(() => {
          this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, asin: t(TranslationKey['No ASIN']) }
        })
        throw new Error(t(TranslationKey['No ASIN']))
      }

      const amazonResult = await ProductModel.parseAmazon(product.asin)
      this.weightParserAmazon = amazonResult.weight || 0

      if (!amazonResult.price) {
        throw new Error('price <= 0')
      }

      runInAction(() => {
        if (Object.keys(amazonResult).length > 5) {
          this.product = {
            ...this.product,
            ...parseFieldsAdapter(amazonResult, ProductDataParser.AMAZON),
            weight:
              this.product.weight > Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL)
                ? this.product.weight
                : Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL),

            amazonDescription: amazonResult.info?.description || this.product.amazonDescription,
            amazonDetail: amazonResult.info?.detail || this.product.amazonDetail,
          }

          this.imagesForLoad = amazonResult.images
        }
        updateProductAutoCalculatedFields.call(this)
      })

      const sellerCentralResult = await ProductModel.parseParseSellerCentral(product.asin, amazonResult.price)
      this.weightParserSELLCENTRAL = sellerCentralResult.weight / poundsWeightCoefficient || 0

      runInAction(() => {
        if (Object.keys(sellerCentralResult).length > 5) {
          this.product = {
            ...this.product,
            ...parseFieldsAdapter(sellerCentralResult, ProductDataParser.SELLCENTRAL),
            weight:
              this.product.weight > Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL)
                ? this.product.weight
                : Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL),

            amazonDescription: sellerCentralResult.info?.description || this.product.amazonDescription,
            amazonDetail: sellerCentralResult.info?.detail || this.product.amazonDetail,
          }
        }
        updateProductAutoCalculatedFields.call(this)
      })

      toast.success(t(TranslationKey['Success parse']))

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)

      toast.error(t(TranslationKey['Parsing error']) + '\n' + String(error))
    }
  }
}
