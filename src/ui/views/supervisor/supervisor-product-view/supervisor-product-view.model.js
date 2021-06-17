import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatusByKey} from '@constants/product-status'

import {SupervisorModel} from '@models/supervisor-model'
import {SupplierModel} from '@models/supplier-model'

import {isUndefined} from '@utils/checks'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const fieldsOfProductAllowedToUpdate = ['status', 'checkednotes']

export class SupervisorProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  productBase = undefined
  product = undefined
  suppliers = []
  drawerOpen = false
  selectedSupplier = undefined

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      console.log(location.state.product)
      const product = {
        ...location.state.product,
        supplier: location.state.product.supplier.map(supplierItem => supplierItem._id),
      }
      this.productBase = product
      this.product = product
      this.suppliers = location.state.product.supplier
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.product[fieldName] = e.target.value
    })

  onClickSetProductStatusBtn(statusKey) {
    this.product.status = ProductStatusByKey[statusKey]
  }

  async handleProductActionButtons(actionType) {
    switch (actionType) {
      case 'accept':
        this.onSaveProductData()
        break
      case 'cancel':
        this.onResetInitialProductData()
        break
    }
  }

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const updateProductData = getObjectFilteredByKeyArrayWhiteList(
        this.product,
        fieldsOfProductAllowedToUpdate,
        false,
        (key, value) => {
          if (key === 'checkednotes' && isUndefined(value)) {
            return ''
          } else {
            return value
          }
        },
      )
      await SupervisorModel.updateProduct(this.product._id, updateProductData)
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

  onResetInitialProductData() {
    this.setActionStatus(loadingStatuses.isLoading)
    this.product = this.productBase
    this.setActionStatus(loadingStatuses.success)
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
}
