import { action, makeAutoObservable, reaction, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { poundsWeightCoefficient } from '@constants/configs/sizes-settings'
import { ProductDataParser } from '@constants/product/product-data-parser'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
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

import { ProductVariation } from '@typings/enums/product-variation'

import { fieldsOfProductAllowedToUpdate, formFieldsDefault } from './client-product-view.constants'

export class ClientProductViewModel {
  history = undefined
  requestStatus = undefined
  acceptMessage = ''
  updateDataHandler = undefined

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  get currentData() {
    return this.product
  }

  product = undefined
  productBase = undefined
  productId = undefined
  productVariations = undefined
  productsToBind = undefined

  storekeepersData = []
  shopsData = []

  curUpdateProductData = {}
  warningModalTitle = ''

  paymentMethods = []

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined
  platformSettings = undefined

  selectedSupplier = undefined

  showWarningModal = false
  showConfirmModal = false
  showAddOrEditSupplierModal = false
  showBindProductModal = false
  showSupplierApproximateCalculationsModal = false

  supplierModalReadOnly = false

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

  get languageTag() {
    return SettingsModel.languageTag
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

      const response = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.platformSettings = response
      })

      this.getStorekeepers()
    } catch (error) {
      console.log(error)
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
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
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
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async getProductsVariations() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await ProductModel.getProductsVariationsByGuid(this.product?.parentProductId || this.product?._id)

      runInAction(() => {
        this.productVariations = result
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
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
      console.log(error)
    }
  }

  async navigateToProduct(id) {
    const win = window.open(`/client/inventory/product?product-id=${id}`, '_blank')
    win.focus()
  }

  async getProductById() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result
        this.productBase = result
        this.imagesForLoad = result.images

        updateProductAutoCalculatedFields.call(this)

        this.setRequestStatus(loadingStatuses.SUCCESS)
      })
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
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
        updateProductAutoCalculatedFields.call(this)
      }
    })

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
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

  async getShops() {
    try {
      const result = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      console.log(error)
    }
  }

  async openConfirmModalWithTextByStatus(withoutStatus, updateDataHandler) {
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
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onSaveProductData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      if (this.imagesForLoad?.length) {
        await onSubmitPostImages.call(this, { images: this.imagesForLoad, type: 'uploadedImages' })
        runInAction(() => {
          this.imagesForLoad = []
        })
      }

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

      runInAction(() => {
        this.alertShieldSettings = {
          showAlertShield: true,
          alertShieldMessage: this.isValidLink
            ? t(TranslationKey['Data was successfully saved'])
            : t(
                TranslationKey[
                  'Data has been successfully saved, but some of the entered links may be invalid and were not uploaded.'
                ],
              ),
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

        this.isValidLink = true
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
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

  async onClickSupplierButtons(actionType) {
    this.getSuppliersPaymentMethods()

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
            successBtnText: t(TranslationKey.Yes),
            cancelBtnText: t(TranslationKey.Cancel),
            onClickOkBtn: () => this.onRemoveSupplier(),
          }
        })
        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }

  async onClickSaveSupplierBtn({ supplier, photosOfSupplier, editPhotosOfSupplier, photosOfUnit, editPhotosOfUnit }) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

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

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: photosOfSupplier, type: 'readyImages' })
        supplier = {
          ...supplier,
          images: [...supplier.images, ...this.readyImages],
        }
      }

      if (editPhotosOfUnit.length) {
        await onSubmitPostImages.call(this, { images: editPhotosOfUnit, type: 'readyImages' })
        supplier = {
          ...supplier,
          imageUnit: this.readyImages,
        }
      }

      if (photosOfUnit.length) {
        await onSubmitPostImages.call(this, { images: photosOfUnit, type: 'readyImages' })
        supplier = {
          ...supplier,
          imageUnit: [...supplier.imageUnit, ...this.readyImages],
        }
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(supplier, patchSuppliers)
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)

        if (supplier._id === this.product.currentSupplierId) {
          runInAction(() => {
            this.product.currentSupplier = supplier
          })
          updateProductAutoCalculatedFields.call(this)
        }
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)
        await ProductModel.addSuppliersToProduct(this.product._id, [createSupplierResult.guid])
        await this.getProductById()
      }

      await this.onSaveForceProductData()

      this.loadData()

      this.onTriggerAddOrEditSupplierModal()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onSaveForceProductData() {
    try {
      await ClientModel.updateProduct(
        this.productId,
        getObjectFilteredByKeyArrayWhiteList(
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
      console.log(error)
    }
  }

  async patchProductTransparencyHandler() {
    try {
      await ClientModel.patchProductTransparency(this.productId, {
        transparency: this.product.transparency,
      })
    } catch (error) {
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        runInAction(() => {
          this.selectedSupplier = undefined
        })
      } else {
        this.getSupplierModalData()
      }

      runInAction(() => {
        this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSupplierApproximateCalculations() {
    try {
      await this.getSupplierModalData()

      this.onTriggerOpenModal('showSupplierApproximateCalculationsModal')
    } catch (error) {
      console.log(error)
    }
  }

  async getSupplierModalData() {
    try {
      const [result] = await Promise.all([UserModel.getPlatformSettings(), this.getStorekeepers()])

      runInAction(() => {
        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
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

        if (!sellerCentralResult.amazonFee) {
          throw new Error('fbafee <= 0')
        }

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
      } else {
        runInAction(() => {
          this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, asin: t(TranslationKey['No ASIN']) }
        })
      }

      toast.success(t(TranslationKey['Success parse']))

      this.onTriggerOpenModal('showWarningModal')
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)

      runInAction(() => {
        this.warningModalTitle = t(TranslationKey['Parsing error']) + '\n' + String(error)
      })
      this.onTriggerOpenModal('showWarningModal')
    }
  }
}
