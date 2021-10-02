import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {ActiveSubCategoryTablesKeys} from '@constants/active-sub-category-tables-keys'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByCode, OrderStatusByKey} from '@constants/order-status'
import {warehouses} from '@constants/warehouses'

import {AdministratorModel} from '@models/administrator-model'
import {SettingsModel} from '@models/settings-model'

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

  activeSubCategory = SettingsModel.activeSubCategoryState[ActiveSubCategoryTablesKeys.ADMIN_ORDERS] || 0
  drawerOpen = false
  modalBarcode = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setActiveSubCategoryState(state) {
    SettingsModel.setActiveSubCategoryState(state, ActiveSubCategoryTablesKeys.ADMIN_ORDERS)
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.ADMIN_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_ORDERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onClickTableRow(order) {
    this.history.push('/admin/orders/order', {order: toJS(order)})
  }

  onChangeSubCategory(value) {
    this.setActiveSubCategoryState(value)
    this.activeSubCategory = value
    this.getOrdersByStatus(value)
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getOrdersByStatus(activeSubCategory) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await AdministratorModel.getOrdersByStatus(ordersStatusBySubCategory[activeSubCategory])

      const ordersData = result.map(item => ({
        ...item,
        tmpBarCode: item.product.barCode,
        tmpTotalPrice:
          ((parseFloat(item.product.currentSupplier?.price) || 0) +
            (parseFloat(item.product.currentSupplier?.delivery) || 0)) *
          (parseInt(item.amount) || 0),
        tmpGrossWeightKg: item.product.weight * item.amount,
        tmpWarehouses: warehouses[item.warehouse],
        tmpStatus: OrderStatusByCode[item.status],
      }))

      runInAction(() => {
        this.currentOrdersData = ordersData
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
      this.currentOrdersData = []
    }
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

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }
}
