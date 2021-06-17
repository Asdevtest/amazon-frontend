import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatusByKey} from '@constants/product-status'

import {BuyerModel} from '@models/buyer-model'
import {SupplierModel} from '@models/supplier-model'

import {isUndefined} from '@utils/checks'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const fieldsOfProductAllowedToUpdate = [
  'lsupplier',
  'amazon',
  'reffee',
  'fbalink',
  'fbafee',
  'fbaamount',
  'delivery',
  'status',
  'profit',
  'margin',
  'buyerscomment',
  'additionalProp1',
  'supplier',
]

export class BuyerProductViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  productBase = undefined
  product = undefined
  suppliers = []
  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false

  constructor({history, location}) {
    this.history = history
    if (location.state) {
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

  onChangeProductFields = fieldsName =>
    action(e => {
      this.product[fieldsName] = e.target.value
    })

  onClickSetProductStatusBtn(statusKey) {
    this.product.status = ProductStatusByKey[statusKey]
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
    if (actionType === 'add') {
      runInAction(() => {
        this.selectedSupplier = undefined
      })
      this.onTriggerAddOrEditSupplierModal()
    } else if (actionType === 'edit') {
      this.onTriggerAddOrEditSupplierModal()
    } else {
      this.onRemoveSuppliier()
    }
  }

  async onRemoveSuppliier() {
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
          if (key === 'buyerscomment' && isUndefined(value)) {
            return ''
          } else {
            return value
          }
        },
      )
      await BuyerModel.updateProduct(this.product._id, updateProductData)
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

  async onClickSaveSupplierBtn(supplier) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, ['_id'])
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
        const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === supplier._id)
        this.suppliers[findSupplierIndex] = supplier
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        runInAction(() => {
          this.product.supplier.push(createSupplierResult.guid)
          this.suppliers.push({...supplier, _id: createSupplierResult.guid})
        })
        this.onSaveProductData()
      }
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onResetInitialProductData() {
    this.setActionStatus(loadingStatuses.isLoading)
    this.product = this.productBase
    this.setActionStatus(loadingStatuses.success)
  }

  onTriggerAddOrEditSupplierModal() {
    if (this.showAddOrEditSupplierModal) {
      this.selectedSupplier = undefined
    }
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
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
