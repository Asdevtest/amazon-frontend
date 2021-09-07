import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {SupervisorModel} from '@models/supervisor-model'
import {SupervisorUpdateProductContract} from '@models/supervisor-model/supervisor-model.contracts'
import {SupplierModel} from '@models/supplier-model'

import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayWhiteList,
  getObjectFilteredByKeyArrayBlackList,
} from '@utils/object'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const fieldsOfProductAllowedToUpdate = [
  'checkednotes',
  'lamazon',
  'lsupplier',
  'bsr',
  'status',
  'amazon',
  'supplier',
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
]

const formFieldsDefault = {
  checkednotes: '',
  amazon: 0,
  bsr: 0,
  createdat: '',
  createdby: {},
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
  supplier: [],
  updateDate: '',
  _id: '',
  fbaamount: 0,
}

export class SupervisorProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  product = undefined
  suppliers = []
  drawerOpen = false
  selectedSupplier = undefined
  showWarningNoSupplierModal = false

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      const product = {
        ...location.state.product,
        supplier: location.state.product.supplier.map(supplierItem => supplierItem._id),
      }
      this.product = product
      this.suppliers = location.state.product.supplier
    }
    makeAutoObservable(this, undefined, {autoBind: true})
    this.updateAutoCalculatedFields()
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldName]: ''}

      if (['checkednotes'].includes(fieldName)) {
        this.product[fieldName] = e.target.value
      } else {
        if (isNaN(e.target.value) || Number(e.target.value) < 0) {
          return
        }

        this.product[fieldName] = e.target.value
      }

      this.updateAutoCalculatedFields()
    })

  onClickSetProductStatusBtn(statusKey) {
    if (statusKey === ProductStatus.COMPLETE_SUCCESS && !this.product.currentSupplier) {
      this.onTriggerOpenModal('showWarningNoSupplierModal')
    } else {
      this.product.status = ProductStatusByKey[statusKey]
    }
  }

  async handleProductActionButtons(actionType, withoutStatus) {
    switch (actionType) {
      case 'accept':
        this.onSaveProductData(withoutStatus)
        break
      case 'cancel':
        this.history.push('/supervisor/products')
        break
    }
  }

  async onSaveProductData(withoutStatus) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      let updateProductData = getObjectFilteredByKeyArrayWhiteList(
        this.product,
        fieldsOfProductAllowedToUpdate,
        false,
        (key, value) => {
          switch (key) {
            case 'checkednotes':
              return value || ''
            case 'bsr':
              return value && parseFloat(value)
            case 'amazon':
              return value && parseFloat(value)
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
            default:
              return value
          }
        },
      )
      if (withoutStatus) {
        updateProductData = getObjectFilteredByKeyArrayBlackList(updateProductData, ['status'])
      }

      await transformAndValidate(SupervisorUpdateProductContract, updateProductData)

      await SupervisorModel.updateProduct(this.product._id, updateProductData)
      this.setActionStatus(loadingStatuses.success)
      this.history.push('/supervisor/products')
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)

      console.log('error', error)

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

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  async onClickSupplierButtons(actionType) {
    if (actionType === 'add') {
      runInAction(() => {
        this.selectedSupplier = undefined
      })
      this.onTriggerAddOrEditSupplierModal()
    } else if (actionType === 'edit') {
      this.onTriggerAddOrEditSupplierModal()
    } else {
      this.onRemoveSupplier()
    }
  }

  async onRemoveSupplier() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setActionStatus(loadingStatuses.success)
      const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === this.selectedSupplier._id)
      const findProductSupplierIndex = this.product.supplier.findIndex(
        supplierItem => supplierItem._id === this.selectedSupplier._id,
      )
      runInAction(() => {
        this.suppliers.splice(findSupplierIndex, 1)
        this.product.supplier.splice(findProductSupplierIndex, 1)
        this.selectedSupplier = undefined
        this.onSaveProductData()
      })
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async loadSupliersForProduct() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(async () => {
        this.suppliers = []
        for (let index = 0; index < this.product.supplier.length; index++) {
          const getSupplierResult = await SupplierModel.getSupplier(this.product.supplier[index])
          runInAction(() => {
            this.suppliers.push(getSupplierResult)
          })
        }
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerAddOrEditSupplierModal() {
    if (this.showAddOrEditSupplierModal) {
      this.selectedSupplier = undefined
    }
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  updateAutoCalculatedFields() {
    this.product.totalFba = (parseFloat(this.product.fbafee) || 0) + (parseFloat(this.product.amazon) || 0) * 0.15

    this.product.maxDelivery = this.product.express ? (this.product.weight || 0) * 7 : (this.product.weight || 0) * 5
    // что-то не то
    this.product.minpurchase =
      (parseFloat(this.product.amazon) || 0) -
      (parseFloat(this.product.totalFba) || 0) -
      0.4 * ((parseFloat(this.product.amazon) || 0) - (parseFloat(this.product.totalFba) || 0)) -
      (parseFloat(this.product.maxDelivery) || 0)
    if (this.product.currentSupplier && this.product.currentSupplier._id) {
      this.product.reffee = (parseFloat(this.product.amazon) || 0) * 0.15
      if (this.product.fbafee) {
        this.product.profit = (
          (parseFloat(this.product.amazon) || 0).toFixed(2) -
            (this.product.reffee || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) -
            (parseFloat(this.product.fbafee) || 0).toFixed(2) || 0
        ).toFixed(4)
      } else {
        this.product.profit = (
          (parseFloat(this.product.amazon) || 0).toFixed(2) -
            (this.product.reffee || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) || 0
        ).toFixed(4)
      }
      this.product.margin =
        (this.product.profit /
          ((parseFloat(this.product.currentSupplier.price) || 0) +
            (parseFloat(this.product.currentSupplier.delivery) || 0))) *
        100
    } else {
      this.product.profit = 0
      this.product.margin = 0
    }
  }
}
