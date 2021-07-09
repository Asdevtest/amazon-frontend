import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const updateOrderKeys = ['status', 'amount', 'deliveryMethod', 'warehouse', 'clientComment', 'barCode']

export class ClientOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  orders = []
  drawerOpen = false
  showBarcodeModal = false
  rowsPerPage = 15
  curPage = 1
  selectedOrder = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getOrders()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getOrders() {
    try {
      const result = await ClientModel.getOrders()

      runInAction(() => {
        this.orders = result
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickTableRow(order) {
    this.history.push('/client/orders/order', {order: toJS(order)})
  }

  onClickCheckbox(order) {
    this.selectedOrder = order
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

  onClickDeleteBarcode(order) {
    const updateOrderData = {
      ...order,
      barCode: '',
    }
    this.onSaveOrder(updateOrderData)
  }

  async onSaveOrder(order) {
    try {
      const updateOrderData = getObjectFilteredByKeyArrayWhiteList(order, updateOrderKeys, true)
      await ClientModel.updateOrder(order._id, updateOrderData)
      runInAction(() => {
        this.selectedOrder = undefined
      })
      this.getOrders()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerShowBarcodeModal() {
    this.showBarcodeModal = !this.showBarcodeModal
  }

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPge = 1
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
