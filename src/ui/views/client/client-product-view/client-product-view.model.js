import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ProductForTestOnly} from '@models/product-for-test-only-model'
import {SupplierModel} from '@models/supplier-model'

export class ClientProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  product = {}

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  activeChip = null

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFieldProduct = fieldsName =>
    action(e => {
      this.product[fieldsName] = e.target.value
    })

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier.id === supplier.id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
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

  async onClickSupplierButtons(actionType) {
    if (actionType === 'add') {
      runInAction(() => {
        this.selectedSupplier = undefined
      })
      this.onTriggerAddOrEditSupplierModal()
    } else if (actionType === 'edit') {
      this.onTriggerAddOrEditSupplierModal()
    } else {
      try {
        await SupplierModel.removeSupplier(this.selectedSupplier.id)
        runInAction(() => {
          this.selectedSupplier = undefined
        })
      } catch (error) {
        console.log(error)
      }
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

  async onClickSaveSupplierBtn(supplier) {
    try {
      if (supplier.id) {
        await SupplierModel.updateSupplier(supplier)
      } else {
        await SupplierModel.createSupplier(supplier)
      }
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerAddOrEditSupplierModal() {
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }
}
