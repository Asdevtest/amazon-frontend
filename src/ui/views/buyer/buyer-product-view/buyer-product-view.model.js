import { action, makeAutoObservable, reaction, runInAction } from 'mobx'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { BuyerModel } from '@models/buyer-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { isUndefined } from '@utils/checks'
import { getNewObjectWithDefaultValue, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'
import { isValidationErrors, plainValidationErrorAndApplyFuncForEachError } from '@utils/validation'

import {
  confirmMessageByProductStatus,
  fieldsOfProductAllowedToForceUpdate,
  fieldsOfProductAllowedToUpdate,
  formFieldsDefault,
  warningModalTitleVariants,
} from './buyer-product-view.constants'

export class BuyerProductViewModel {
  history = undefined
  requestStatus = undefined

  productId = undefined

  product = undefined
  productBase = undefined
  curUpdateProductData = {}
  warningModalTitle = ''

  storekeepersData = []
  hsCodeData = {}

  platformSettings = undefined

  paymentMethods = []

  showTab = undefined

  supplierModalReadOnly = false

  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showEditHSCodeModal = false

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  showWarningModal = false
  showConfirmModal = false
  showSuccessModal = false

  setOpenModal = undefined
  productVariations = undefined

  imagesForLoad = []

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  confirmModalSettings = {
    isWarning: false,
    message: '',
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

  constructor({ history, setOpenModal }) {
    this.history = history

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

  async getProductById() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = this.product ? { ...result, status: this.product.status } : result

        this.productBase = result

        this.imagesForLoad = result.images

        updateProductAutoCalculatedFields.call(this)
      })

      if (
        result.status === ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] ||
        result.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]
      ) {
        await BuyerModel.pickupProduct(this.productId)

        this.getProductById()
      }
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
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

  onChangeProductFields = fieldsName =>
    action(e => {
      this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldsName]: '' }

      if (['icomment', 'checkednotes', 'buyersComment', 'clientComment'].includes(fieldsName)) {
        this.product = { ...this.product, [fieldsName]: e }
      } else {
        this.product = { ...this.product, [fieldsName]: e.target.value }
      }

      updateProductAutoCalculatedFields.call(this)
    })

  onClickSetProductStatusBtn(statusKey) {
    this.product = { ...this.product, status: ProductStatusByKey[statusKey] }
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
            onClickOkBtn: () => this.onRemoveSupplier(),
          }
        })
        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }
  async onRemoveSupplier() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await ProductModel.removeSuppliersFromProduct(this.product._id, [this.selectedSupplier._id])

      runInAction(() => {
        if (this.product.currentSupplierId && this.product.currentSupplierId === this.selectedSupplier?._id) {
          this.product.currentSupplierId = null
        }
      })
      this.onSaveForceProductData()

      runInAction(() => {
        this.product.suppliers
        this.selectedSupplier = undefined
      })

      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async handleProductActionButtons(actionType, withoutStatus, isModal, updateDataHandler) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(updateDataHandler)

        break
      case 'cancel':
        this.history.push('/buyer/my-products')

        break

      case 'closeModal':
        this.setOpenModal()
        break
    }
  }

  async openConfirmModalWithTextByStatus(updateDataHandler) {
    try {
      runInAction(() => {
        this.curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
          this.product,
          fieldsOfProductAllowedToUpdate,
          false,
          (key, value) => {
            if (key === 'buyersComment' && isUndefined(value)) {
              return ''
            } else {
              return value
            }
          },
        )
      })

      if (
        this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER] ||
        this.curUpdateProductData.status ===
          ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER] ||
        ((this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER] ||
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER] ||
          this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE] ||
          this.curUpdateProductData.status ===
            ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE]) &&
          this.curUpdateProductData.currentSupplierId)
      ) {
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: false,
            message: confirmMessageByProductStatus()[this.curUpdateProductData.status],
            onClickOkBtn: () => {
              this.onSaveProductData(updateDataHandler)

              this.successModalTitle = `${t(TranslationKey['Status changed'])}!`
              this.onTriggerOpenModal('showSuccessModal')
            },
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
      } else {
        runInAction(() => {
          this.warningModalTitle =
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] ||
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] ||
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT] ||
            this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]
              ? warningModalTitleVariants().CHOOSE_STATUS
              : warningModalTitleVariants().NO_SUPPLIER
          this.onTriggerOpenModal('showWarningModal')
        })
      }
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)

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

  async onClickHsCode(id) {
    try {
      const response = await ProductModel.getProductsHsCodeByGuid(id)

      runInAction(() => {
        this.hsCodeData = response
      })

      this.onTriggerOpenModal('showEditHSCodeModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSaveHsCode(hsCode) {
    await ProductModel.editProductsHsCods([
      {
        productId: hsCode._id,
        chinaTitle: hsCode.chinaTitle || null,
        hsCode: hsCode.hsCode || null,
        material: hsCode.material || null,
        productUsage: hsCode.productUsage || null,
      },
    ])

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async onSaveProductData(updateDataHandler) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await BuyerModel.updateProduct(this.product._id, this.curUpdateProductData)
      await this.loadData()
      this.showSuccesAlert()
      updateDataHandler && (await updateDataHandler())

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
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

  async onSaveForceProductData() {
    try {
      await BuyerModel.updateProduct(
        this.productId,
        getObjectFilteredByKeyArrayWhiteList(
          this.product,
          fieldsOfProductAllowedToForceUpdate,
          false,
          (key, value) => {
            if (key === 'buyersComment' && isUndefined(value)) {
              return ''
            } else {
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
          runInAction(() => {
            this.product.currentSupplier = supplier
          })
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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
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

  clearReadyImages() {
    this.readyImages = []
  }

  async navigateToProduct(id) {
    const win = window.open(`/buyer/my-products/product?product-id=${id}`, '_blank')
    win.focus()
  }
}
