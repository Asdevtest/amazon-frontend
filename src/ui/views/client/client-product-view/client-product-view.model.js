import {action, makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ProductForTestOnly} from '@models/product-for-test-only-model'

export class ClientProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  product = {}

  drawerOpen = false
  selectedSupplier = 0
  modalAddSupplier = false
  modalEditSupplier = false
  activeChip = null

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFieldProduct = fieldsName =>
    action(e => {
      this.product[fieldsName] = e.target.value
    })

  onChangeSelectedSupplier(e, value) {
    this.selectedSupplier = value
  }

  onChangeSuppliers(e, value) {
    this.suppliers = value
  }

  onChangeProduct(e, value) {
    this.product = value
  }

  onChangeActiveChip(e, value) {
    this.activeChip = value
  }

  onChangeModalAddSupplier(e, value) {
    this.modalAddSupplier = value
  }

  onChangeModalEditSupplier(e, value) {
    this.modalEditSupplier = value
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onSupplierButtons(actionName) {
    if (actionName === 'add') {
      this.modalAddSupplier = true
    } else if (actionName === 'edit') {
      this.modalEditSupplier = true
    } else {
      this.suppliers = this.suppliers.filter((supplier, index) => this.selectedSupplier !== index)
    }
  }

  async getProductData(id) {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      const result = await ProductForTestOnly.getProduct(id)
      this.product = result
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }
}
