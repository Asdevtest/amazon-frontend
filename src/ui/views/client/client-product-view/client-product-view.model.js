import { action, makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

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
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayBlackList,
  getObjectFilteredByKeyArrayWhiteList,
} from '@utils/object'
import { parseFieldsAdapter } from '@utils/parse-fields-adapter'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { ProductVariation } from '@typings/product'

const formFieldsDefault = {
  checkednotes: '',
  amazon: 0,
  bsr: 0,
  createdat: '',
  createdBy: {},
  delivery: 0,
  dirdecision: 0,
  express: false,
  fba: false,
  fbafee: 0,
  icomment: '',
  asin: '',
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

const fieldsOfProductAllowedToUpdate = [
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
  'currentSupplierId',
  'asin',
  'clientComment',
  'skusByClient',

  'niche',
  'asins',
  'avgRevenue',
  'avgBSR',
  'totalRevenue',
  'coefficient',
  'avgPrice',
  'avgReviews',
  'shopIds',
  'redFlags',
  'tags',
  // 'totalFba'
]

export class ClientProductViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  acceptMessage = ''

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
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

  selectedSupplier = undefined

  showWarningModal = false
  showConfirmModal = false
  showAddOrEditSupplierModal = false
  showBindProductModal = false

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

  formFields = { ...formFieldsDefault }

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  constructor({ history, setOpenModal, productId }) {
    const url = new URL(window.location.href)

    runInAction(() => {
      this.history = history
      this.productId = productId

      if (setOpenModal) {
        this.setOpenModal = setOpenModal
      }

      this.showTab = url.searchParams.get('show-tab')
    })

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.languageTag,
      () =>
        runInAction(() => {
          this.product = this.product ? { ...this.product } : undefined
        }),
    )

    reaction(
      () => this.productId,
      () =>
        runInAction(() => {
          this.loadData()
        }),
    )
  }

  async updateProductId(productId) {
    runInAction(() => {
      this.productId = productId
    })

    try {
      await this.getProductById()
    } catch (error) {
      console.log(error)
    }
  }

  getCurrentData() {
    return toJS(this.product)
  }

  async loadData() {
    try {
      await this.getProductById()
      await this.getShops()
      await this.getProductsVariations()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickGetProductsToBind(option) {
    try {
      const result = await ClientModel.getProductPermissionsData(
        option === ProductVariation.PARENT ? { isChild: false } : { isChild: false, isParent: false },
      )
      runInAction(() => {
        this.productsToBind = result
      })
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
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

      console.log('option', option)
      console.log('products', products)

      this.loadData()
      this.onTriggerOpenModal('showBindProductModal')
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getProductsVariations() {
    if (this.product) {
      try {
        this.setRequestStatus(loadingStatuses.isLoading)

        const result = await ProductModel.getProductsVariationsByGuid(
          this.product?.parentProductId || this.product?._id,
        )

        runInAction(() => {
          this.productVariations = result
        })

        this.setRequestStatus(loadingStatuses.success)
      } catch (error) {
        console.log('error', error)
        this.setRequestStatus(loadingStatuses.failed)
      }
    }
  }

  async unbindProductHandler(childProductIds) {
    try {
      await ProductModel.unbindProducts({
        parentProductId: null,
        childProductIds: [childProductIds],
      })

      this.loadData()
    } catch (error) {
      console.log('error', error)
    }
  }

  async navigateToProduct(id) {
    const win = window.open(`/client/inventory/product?product-id=${id}`, '_blank')
    win.focus()
  }

  updateImagesForLoad(images) {
    if (!Array.isArray(images)) {
      return
    }

    const filteredImages = images.filter(el => !this.imagesForLoad.some(item => item.includes(el)))

    runInAction(() => {
      this.imagesForLoad = [...this.imagesForLoad, ...filteredImages.map(el => getAmazonImageUrl(el, true))]
    })
  }

  async getProductById() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result

        this.productBase = result

        this.imagesForLoad = []

        this.updateImagesForLoad(result.images)

        updateProductAutoCalculatedFields.call(this)
        this.setRequestStatus(loadingStatuses.success)
      })
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeProductFields = fieldName =>
    action(e => {
      runInAction(() => {
        this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldName]: '' }
      })
      if (
        [
          'icomment',
          'category',
          'lamazon',
          'clientComment',
          'amazonTitle',
          'amazonDescription',
          'amazonDetail',
          'skusByClient',
          'niche',
          'asins',
          'shopIds',
          'redFlags',
          'tags',
        ].includes(fieldName)
      ) {
        runInAction(() => {
          this.product = { ...this.product, [fieldName]: e.target.value }
        })
      } else {
        if (['asin'].includes(fieldName)) {
          runInAction(() => {
            this.product = { ...this.product, [fieldName]: e.target.value.replace(/[^0-9a-zA-Z]/g, '') }
          })
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
          runInAction(() => {
            this.product[fieldName] = parseInt(e.target.value)
          })
        }

        runInAction(() => {
          this.product = { ...this.product, [fieldName]: e.target.value }
        })
      }

      if (['bsr', 'express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba', 'reffee'].includes(fieldName)) {
        updateProductAutoCalculatedFields.call(this)
      }
    })

  onChangeProduct(e, value) {
    runInAction(() => {
      this.product = value
    })
  }

  onChangeImagesForLoad(value) {
    runInAction(() => {
      this.imagesForLoad = value
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
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
      runInAction(() => {
        this.error = error
      })
    }
  }

  async handleProductActionButtons(actionType, withoutStatus, isModal) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(withoutStatus)
        break
      case 'cancel':
        this.product.archive
          ? this.history.push('/client/inventory/archive', { isArchive: this.product.archive })
          : this.history.push('/client/inventory', { isArchive: this.product.archive })
        break
      case 'delete':
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            title: t(TranslationKey['Delete a card']),
            message: t(TranslationKey['After confirmation, the card will be moved to the archive. Move?']),
            successBtnText: t(TranslationKey.Delete),
            cancelBtnText: t(TranslationKey.Cancel),
            onClickOkBtn: () => this.onDeleteProduct(isModal),
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
            onClickOkBtn: () => this.onRestoreProduct(isModal),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')

        break
      case 'closeModal':
        this.setOpenModal()
        break
    }
  }

  async onRestoreProduct(isModal) {
    try {
      await ClientModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayWhiteList({ ...this.product, archive: false }, ['archive']),
      )

      if (isModal) {
        this.setOpenModal()
      } else {
        this.history.goBack()
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onDeleteProduct(isModal) {
    try {
      await ClientModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayWhiteList({ ...this.product, archive: true }, ['archive']),
      )

      if (isModal) {
        this.setOpenModal()
      } else {
        this.history.goBack()
      }
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)

      runInAction(() => {
        this.error = error
      })
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

      await this.loadData()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)

      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      runInAction(() => {
        this.uploadedImages = []
      })

      if (this.imagesForLoad.length) {
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
            images: this.uploadedImages.length
              ? [/* ...this.curUpdateProductData.images, */ ...this.uploadedImages]
              : this.curUpdateProductData.images,
          },
          ['suppliers'],
        ),
      )

      this.getProductById()

      runInAction(() => {
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
      })

      // this.warningModalTitle = t(TranslationKey['Data was successfully saved'])

      // this.onTriggerOpenModal('showWarningModal')
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  async getSuppliersPaymentMethods() {
    this.paymentMethods = await SupplierModel.getSuppliersPaymentMethods()
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

  async onClickSaveSupplierBtn({ supplier, photosOfSupplier, editPhotosOfSupplier }) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

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
          runInAction(() => {
            this.product.currentSupplier = supplier
          })
          updateProductAutoCalculatedFields.call(this)
        }
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)
        await ProductModel.addSuppliersToProduct(this.product._id, [createSupplierResult.guid])
        await this.getProductById(this.productId)
      }

      await this.onSaveForceProductData()

      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
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
      console.log('error', error)
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        runInAction(() => {
          this.selectedSupplier = undefined
        })
      } else {
        const [result] = await Promise.all([UserModel.getPlatformSettings(), this.getStorekeepers()])

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

  onChangeSelectedSupplier(supplier) {
    runInAction(() => {
      if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
        this.selectedSupplier = undefined
      } else {
        this.selectedSupplier = supplier
      }
    })
  }

  async onClickParseProductData(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
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

            this.updateImagesForLoad(amazonResult.images)
          }
          updateProductAutoCalculatedFields.call(this)
        })

        const sellerCentralResult = await ProductModel.parseParseSellerCentral(product.asin, {
          price: amazonResult.price,
        })
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
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }

      this.warningModalTitle = t(TranslationKey['Parsing error']) + '\n' + String(error)
      this.onTriggerOpenModal('showWarningModal')
    }
  }

  clearReadyImages() {
    runInAction(() => {
      this.readyImages = []
    })
  }

  clearProduct() {
    runInAction(() => {
      this.product = undefined
    })
  }
}
