import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatusByKey, ProductStatus} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {BuyerModel} from '@models/buyer-model'
import {ProductModel} from '@models/product-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
import {isUndefined} from '@utils/checks'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayBlackList,
  getObjectFilteredByKeyArrayWhiteList,
} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

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

  supplierModalReadOnly = false

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  showWarningModal = false
  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
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

  constructor({history}) {
    this.history = history

    this.productId = history.location.search.slice(1)

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      await this.getProductById()
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = this.product ? {...result, status: this.product.status} : result

        this.productBase = result
        updateProductAutoCalculatedFields.call(this)
      })
    } catch (error) {
      console.log(error)
    }
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
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldsName]: ''}

      this.product = {...this.product, [fieldsName]: e.target.value}
      updateProductAutoCalculatedFields.call(this)
    })

  onClickSetProductStatusBtn(statusKey) {
    this.product = {...this.product, status: ProductStatusByKey[statusKey]}
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
      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setActionStatus(loadingStatuses.success)

      runInAction(() => {
        this.product.suppliers
        this.selectedSupplier = undefined
        if (this.product.currentSupplierId && this.product.currentSupplierId === this.selectedSupplier?._id) {
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

  async handleProductActionButtons(actionType) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus()

        break
      case 'cancel':
        this.history.push('/buyer/my-products')
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
        (this.curUpdateProductData.currentSupplierId &&
          this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] &&
          !this.product.isCreatedByClient) ||
        (this.curUpdateProductData.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER] &&
          this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] &&
          this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] &&
          !this.product.isCreatedByClient) ||
        (this.curUpdateProductData.currentSupplierId &&
          this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT] &&
          this.product.isCreatedByClient) ||
        (this.curUpdateProductData.status ===
          ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER] &&
          this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT] &&
          this.curUpdateProductData.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH] &&
          this.product.isCreatedByClient)
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
        plainValidationErrorAndApplyFuncForEachError(error, ({errorProperty, constraint}) => {
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

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      await BuyerModel.updateProduct(this.product._id, this.curUpdateProductData)

      this.setActionStatus(loadingStatuses.success)

      this.history.push('/buyer/my-products')
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        console.log(error.body.message)
        this.error = error.body.message
      }
    }
  }

  async onSaveForceProductData() {
    try {
      await BuyerModel.updateProduct(
        this.productId,
        getObjectFilteredByKeyArrayWhiteList(this.product, fieldsOfProductAllowedToForceUpdate, false, (key, value) => {
          if (key === 'buyersComment' && isUndefined(value)) {
            return ''
          } else {
            return value
          }
        }),
      )

      this.loadData()
    } catch (error) {
      console.log('error', error)
    }
  }

  async onClickSaveSupplierBtn(supplier, photosOfSupplier) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

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

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
