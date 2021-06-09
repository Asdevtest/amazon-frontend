import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'

export class BuyerMyOrdersViewModel {
  history = undefined
  requestStatus = undefined

  ordersMy = []
  drawerOpen = false
  showBarcodeModal = false
  showOrderModal = false
  rowsPerPage = 5
  curPage = 1
  selectedOrder = 0

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getOrdersMy() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      const result = await BuyerModel.getOrdersMy()
      this.ordersMy = result
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onChangeSelectedOrder(value) {
    this.selectedOrder = value
  }

  onTriggerShowBarcodeModal() {
    this.showBarcodeModal = !this.showBarcodeModal
  }

  onTriggerShowOrderModal() {
    this.showOrderModal = !this.showOrderModal
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }
}
