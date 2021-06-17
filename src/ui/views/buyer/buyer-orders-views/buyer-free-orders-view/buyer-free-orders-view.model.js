import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'

export class BuyerFreeOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  ordersVacant = []
  drawerOpen = false
  showBarcodeModal = false
  showOrderModal = false
  rowsPerPage = 5
  curPage = 1
  selectedOrder = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getOrdersVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getOrdersVacant() {
    try {
      const result = await BuyerModel.getOrdersVacant()
      runInAction(() => {
        this.ordersVacant = result
      })
    } catch (error) {
      this.ordersVacant = []
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickOrder(value) {
    this.selectedOrder = value
  }

  async onDoubleClickOrder(order) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await BuyerModel.pickupOrder(order._id)
      this.setActionStatus(loadingStatuses.success)
      this.loadData()
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickEditBarcode(order) {
    this.selectedOrder = order
    this.onTriggerShowBarcodeModal()
  }

  async onClickSaveBarcode(barCode) {
    const updateOrderData = {
      ...this.selectedOrder,
      barCode,
    }
    await this.onSaveOrder(updateOrderData)
    this.onTriggerShowBarcodeModal()
  }

  onTriggerBarcodeModal() {}

  onClickDeleteBarcode(order) {
    const updateOrderData = {
      ...order,
      barCode: '',
    }
    this.onSaveOrder(updateOrderData)
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
    this.paginationPge = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
