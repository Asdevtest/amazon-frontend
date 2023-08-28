/* eslint-disable no-unused-vars */
import { action, makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

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

const fieldsOfProductAllowedToUpdate = [
  'reffee',
  'fbalink',
  'fbafee',
  'fbaamount',
  'delivery',
  'status',
  'profit',
  'margin',
  'buyersComment',
  'additionalProp1',
  'currentSupplierId',
  'tags',
]

const fieldsOfProductAllowedToForceUpdate = [
  'reffee',
  'fbalink',
  'fbafee',
  'fbaamount',
  'delivery',
  'profit',
  'margin',
  'buyersComment',
  'additionalProp1',
  'currentSupplierId',
  'tags',
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
  updatedAt: '',
  _id: '',
  buyersComment: '',
}

const confirmMessageByProductStatus = () => ({
  60: t(TranslationKey["The supplier's price is not acceptable?"]),
  50: t(TranslationKey['Supplier not found']) + '?',
  40: t(TranslationKey['Supplier found']) + '?',
  240: t(TranslationKey['Supplier found']) + '?',
  260: t(TranslationKey["The supplier's price is not acceptable?"]),
  250: t(TranslationKey['Supplier not found']) + '?',
})

const warningModalTitleVariants = () => ({
  NO_SUPPLIER: t(TranslationKey["You can't choose without a supplier"]),
  CHOOSE_STATUS: t(TranslationKey['We need to choose a status']),
})

export class BuyerProductViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  productId = undefined

  product = undefined
  productBase = undefined
  curUpdateProductData = {}
  warningModalTitle = ''

  storekeepersData = []
  hsCodeData = {}

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

  setOpenModal = undefined
  productVariations = undefined

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

  formFields = { ...formFieldsDefault }

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  constructor({ history, setOpenModal }) {
    const url = new URL(window.location.href)

    if (setOpenModal) {
      this.setOpenModal = setOpenModal
    }

    runInAction(() => {
      this.history = history

      this.productId = url.searchParams.get('product-id')

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
      () => this.loadData(),
    )
  }

  async loadData() {
    try {
      await this.getProductById()
      await this.getProductsVariations()
    } catch (error) {
      console.log(error)
    }
  }

  async getProductsVariations() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await ProductModel.getProductsVariationsByGuid(this.product?.parentProductId || this.product?._id)

      console.log('result', result)

      runInAction(() => {
        this.productVariations = result
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log('error', error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async getProductById() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = this.product ? { ...result, status: this.product.status } : result

        this.productBase = result

        updateProductAutoCalculatedFields.call(this)
      })

      if (
        result.status === ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] ||
        result.status === ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]
      ) {
        await BuyerModel.pickupProduct(this.productId)

        this.getProductById()
      }
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  getCurrentData() {
    return toJS(this.product)
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      this.storekeepersData = result
    } catch (error) {
      console.log(error)
    }
  }

  onChangeProductFields = fieldsName =>
    action(e => {
      this.formFieldsValidationErrors = { ...this.formFieldsValidationErrors, [fieldsName]: '' }

      this.product = { ...this.product, [fieldsName]: e.target.value }
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

  onChangeProduct(e, value) {
    this.product = value
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
        this.supplierModalReadOnly = true

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'edit':
        runInAction(() => {
          this.supplierModalReadOnly = false
        })

        this.onTriggerAddOrEditSupplierModal()
        break
      case 'accept':
        this.product = { ...this.product, currentSupplierId: this.selectedSupplier._id }
        this.product = { ...this.product, currentSupplier: this.selectedSupplier }

        this.selectedSupplier = undefined
        updateProductAutoCalculatedFields.call(this)

        this.onSaveForceProductData()
        break
      case 'acceptRevoke':
        this.product = { ...this.product, currentSupplierId: null }
        this.product = { ...this.product, currentSupplier: undefined }

        this.selectedSupplier = undefined
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
      this.selectedSupplier = undefined

      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async handleProductActionButtons(actionType, withoutStatus, isModal) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(isModal)

        break
      case 'cancel':
        this.history.push('/buyer/my-products')

        break

      case 'closeModal':
        this.setOpenModal()
        break
    }
  }

  async openConfirmModalWithTextByStatus() {
    try {
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
            onClickOkBtn: () => this.onSaveProductData(),
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
      this.setActionStatus(loadingStatuses.failed)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({ errorProperty, constraint }) => {
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

  async onClickHsCode(id) {
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)

    this.onTriggerOpenModal('showEditHSCodeModal')
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

    // this.onSaveForceProductData()

    // this.loadData()
  }

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      await BuyerModel.updateProduct(this.product._id, this.curUpdateProductData)
      await this.loadData()

      this.showSuccesAlert()

      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        console.log(error.body.message)
        this.error = error.body.message
      }
    }
  }

  async showSuccesAlert() {
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
      console.log('error', error)
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

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
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

  async navigateToProduct(id) {
    const win = window.open(`/buyer/my-products/product?product-id=${id}`, '_blank')
    win.focus()
  }
}
