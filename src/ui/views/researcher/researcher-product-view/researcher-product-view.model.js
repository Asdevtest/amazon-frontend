import { action, makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

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
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayBlackList,
  getObjectFilteredByKeyArrayWhiteList,
} from '@utils/object'
import { parseFieldsAdapter } from '@utils/parse-fields-adapter'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'
import { isValidationErrors, plainValidationErrorAndApplyFuncForEachError } from '@utils/validation'

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
  // 'totalFba'

  'currentSupplierId',
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
  'redFlags',
  'tags',
  // 'totalFba'
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

  formFields = { ...formFieldsDefault }

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        this.startParse = location.state.startParse
      }

      this.productId = history.location.search.slice(1)
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.languageTag,
      () =>
        runInAction(() => {
          this.product = this.product ? { ...this.product } : undefined
        }),
    )
  }

  async loadData() {
    try {
      await this.getProductById()

      if (this.startParse) {
        // this.onClickParseProductData(ProductDataParser.AMAZON, this.product)

        // this.onClickParseProductData(ProductDataParser.SELLCENTRAL, this.product)
        this.onClickParseProductData(this.product)
        this.startParse = false
      }
    } catch (error) {
      console.log(error)
    }
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
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result

        this.productBase = result

        // this.imagesForLoad = result.images.map(el => getAmazonImageUrl(el, true))

        this.updateImagesForLoad(result.images)

        updateProductAutoCalculatedFields.call(this)
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

  onChangeProductFields = fieldName =>
    action(e => {
      runInAction(() => {
        this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldName]: '' }
      })
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

        runInAction(() => {
          if (['strategyStatus'].includes(fieldName)) {
            this.product = { ...this.product, [fieldName]: e.target.value, status: this.productBase.status }
          }
        })

        runInAction(() => {
          if (['fbaamount', 'avgBSR', 'totalRevenue', 'avgReviews'].includes(fieldName) && e.target.value !== '') {
            this.product = { ...this.product, [fieldName]: parseInt(e.target.value) }
          } else {
            this.product = { ...this.product, [fieldName]: e.target.value }
          }
        })
      }

      if (['bsr', 'express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba', 'reffee'].includes(fieldName)) {
        updateProductAutoCalculatedFields.call(this)
      }
    })

  onChangeActiveChip(e, value) {
    runInAction(() => {
      this.activeChip = value
    })
  }

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

  async onRemoveSupplier() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      await ProductModel.removeSuppliersFromProduct(this.product._id, [this.selectedSupplier._id])

      runInAction(() => {
        if (this.product.currentSupplierId && this.product.currentSupplierId === this.selectedSupplier?._id) {
          this.product.currentSupplierId = null
        }
      })
      this.onSaveForceProductData()

      this.product.suppliers
      runInAction(() => {
        this.selectedSupplier = undefined
      })

      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      runInAction(() => {
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      })
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
    runInAction(() => {
      if (statusKey === ProductStatus.RESEARCHER_FOUND_SUPPLIER && !this.product.currentSupplierId) {
        this.warningModalTitle = warningModalTitleVariants().NO_SUPPLIER

        this.onTriggerOpenModal('showWarningModal')
      } else {
        this.product = { ...this.product, status: ProductStatusByKey[statusKey] }
      }
    })
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
      this.setActionStatus(loadingStatuses.failed)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({ errorProperty, constraint }) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
            this.alertFailedText = fieldsNotFilledText()
          })
        })
      } else {
        console.warn('error ', error)
        runInAction(() => {
          this.alertFailedText = undefined
          this.error = error
        })
      }
    }
  }

  async onClickSaveSupplierBtn({ supplier, photosOfSupplier, editPhotosOfSupplier }) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

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
      this.setActionStatus(loadingStatuses.success)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      runInAction(() => {
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      })
    }
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

  // async onClickParseProductData(productDataParser, product) {
  //   try {
  //     this.setActionStatus(loadingStatuses.isLoading)
  //     runInAction(() => {
  //       this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
  //     })
  //     const parseResult = await (() => {
  //       switch (productDataParser) {
  //         case ProductDataParser.AMAZON:
  //           return ProductModel.parseAmazon(product.asin)
  //         case ProductDataParser.SELLCENTRAL:
  //           return ProductModel.parseParseSellerCentral(product.asin)
  //       }
  //     })()

  //     switch (productDataParser) {
  //       case ProductDataParser.AMAZON:
  //         this.weightParserAmazon = parseResult.weight || 0
  //         break
  //       case ProductDataParser.SELLCENTRAL:
  //         this.weightParserSELLCENTRAL = parseResult.weight / poundsWeightCoefficient || 0
  //         break
  //     }

  //     runInAction(() => {
  //       if (Object.keys(parseResult).length > 5) {
  //         // проверка, что ответ не пустой (иначе приходит объект {length: 2})
  //         this.product = {
  //           ...this.product,
  //           ...parseFieldsAdapter(parseResult, productDataParser),
  //           weight:
  //             this.product.weight > Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL)
  //               ? this.product.weight
  //               : Math.max(this.weightParserAmazon, this.weightParserSELLCENTRAL),

  //           // Вернуть старый вариант парса
  //           // weight:
  //           //   this.product.weight > parseResult.weight * poundsWeightCoefficient
  //           //     ? this.product.weight
  //           //     : parseResult.weight * poundsWeightCoefficient,

  //           amazonDescription: parseResult.info?.description || this.product.amazonDescription,
  //           amazonDetail: parseResult.info?.detail || this.product.amazonDetail,
  //           fbafee: this.product.fbafee,
  //         }
  //       }
  //       updateProductAutoCalculatedFields.call(this)
  //     })

  //     this.setActionStatus(loadingStatuses.success)
  //   } catch (error) {
  //     console.log(error)
  //     this.setActionStatus(loadingStatuses.failed)
  //     runInAction(() => {
  //       if (error.body && error.body.message) {
  //         this.error = error.body.message
  //       }
  //     })
  //   }
  // }

  onChangeImagesForLoad(value) {
    runInAction(() => {
      this.imagesForLoad = value
    })
  }

  async onSaveProductData(editingСontinues) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      if (this.imagesForLoad.length) {
        await onSubmitPostImages.call(this, { images: this.imagesForLoad, type: 'uploadedImages' })
        this.imagesForLoad = []
      }

      await ResearcherModel.updateProduct(
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
      runInAction(() => {
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      })
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
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  clearReadyImages() {
    runInAction(() => {
      this.readyImages = []
    })
  }
}
