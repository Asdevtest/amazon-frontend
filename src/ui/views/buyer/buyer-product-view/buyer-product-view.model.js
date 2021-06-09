import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ProductForTestOnly} from '@models/product-for-test-only-model'
import {SupplierModel} from '@models/supplier-model'

export class BuyerProductViewModel {
  history = undefined
  requestStatus = undefined

  product = undefined
  drawerOpen = false
  selectedSupplier = undefined
  showModalAddOrEditSupplier = false
  activeChip = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFieldProduct = fieldsName =>
    action(e => {
      this.product[fieldsName] = e.target.value
    })

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

  onTriggerAddOrEditSupplierModal() {
    this.showModalAddOrEditSupplier = !this.showModalAddOrEditSupplier
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  async onClickSupplierBtns(actionType) {
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
}
