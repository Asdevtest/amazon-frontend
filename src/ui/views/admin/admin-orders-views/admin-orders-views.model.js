import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'

import {AdministratorModel} from '@models/administrator-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

const ordersStatusBySubCategory = {
  0: undefined,
  1: OrderStatusByKey[OrderStatus.PAID],
  2: OrderStatusByKey[OrderStatus.AT_PROCESS],
}

export class AdminOrdersAllViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  currentOrdersData = []

  selectionModel = undefined

  activeSubCategory = 0
  drawerOpen = false
  modalBarcode = false
  rowsPerPage = 15
  curPage = 0

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  getCurrentData() {
    return toJS(this.currentOrdersData)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  onTriggerBarcodeModal() {
    this.modalBarcode = !this.modalBarcode
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeCurPage = e => {
    this.curPage = e.page
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
    this.curPage = 0
  }

  onChangeSubCategory(value) {
    this.activeSubCategory = value
    this.getOrdersByStatus(value)
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getOrdersByStatus(activeSubCategory) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await AdministratorModel.getOrdersByStatus(ordersStatusBySubCategory[activeSubCategory])

      runInAction(() => {
        this.currentOrdersData = result.map(order => ({
          ...getObjectFilteredByKeyArrayBlackList(order, ['_id']),
          id: order._id,
        }))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
      this.currentOrdersData = []
    }
  }
}
