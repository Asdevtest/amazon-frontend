import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ADMIN_ORDERS} from '@constants/mocks'

import {AdministratorModel} from '@models/administrator-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class AdminOrdersAllViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  allOrdersData = ADMIN_ORDERS
  paidOrdersData = [ADMIN_ORDERS[2], ADMIN_ORDERS[0], ADMIN_ORDERS[1]]
  notPaidOrdersData = [ADMIN_ORDERS[0], ADMIN_ORDERS[2], ADMIN_ORDERS[1]]

  selectionModel = undefined

  activeSubCategory = 0
  drawerOpen = false
  modalBarcode = false
  rowsPerPage = 5
  curPage = 0

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getAllOrders()
      this.getPaidOrders()
      this.getNotPaidOrders()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  getProductsData() {
    switch (this.activeSubCategory) {
      case 0:
        return this.allOrdersData
      case 1:
        return this.paidOrdersData
      case 2:
        return this.notPaidOrdersData
    }
  }

  getCurrentData() {
    return toJS(this.getProductsData())
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
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getAllOrders() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await AdministratorModel.getAllOrders()
      runInAction(() => {
        this.ordersData = result.map(order => ({
          ...getObjectFilteredByKeyArrayBlackList(order, ['_id']),
          id: order._id,
        }))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async getPaidOrders() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await AdministratorModel.getPaidOrders()
      runInAction(() => {
        this.ordersData = result.map(order => ({
          ...getObjectFilteredByKeyArrayBlackList(order, ['_id']),
          id: order._id,
        }))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async getNotPaidOrders() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await AdministratorModel.getNotPaidOrders()
      runInAction(() => {
        this.ordersData = result.map(order => ({
          ...getObjectFilteredByKeyArrayBlackList(order, ['_id']),
          id: order._id,
        }))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }
}
