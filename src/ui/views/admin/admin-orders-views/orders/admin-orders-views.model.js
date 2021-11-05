import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {ActiveSubCategoryTablesKeys} from '@constants/active-sub-category-tables-keys'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByCode, OrderStatusByKey} from '@constants/order-status'
import {warehouses} from '@constants/warehouses'

import {AdministratorModel} from '@models/administrator-model'
import {SettingsModel} from '@models/settings-model'

import {adminOrdersViewColumns} from '@components/table-columns/admin/orders-columns'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const ordersStatusBySubCategory = {
  0: OrderStatusByKey[OrderStatus.READY_TO_PROCESS],
  1: OrderStatusByKey[OrderStatus.AT_PROCESS],
  2: OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
  3: OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
  4: OrderStatusByKey[OrderStatus.IN_STOCK],
  5: OrderStatusByKey[OrderStatus.RETURN_ORDER],
  6: OrderStatusByKey[OrderStatus.AWAITING_SHIPMENT],
  7: OrderStatusByKey[OrderStatus.SHIPPED],
  8: OrderStatusByKey[OrderStatus.ORDER_CLOSED],
}

export class AdminOrdersAllViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  currentOrdersData = []

  selectionModel = undefined

  activeSubCategory = SettingsModel.activeSubCategoryState[ActiveSubCategoryTablesKeys.ADMIN_ORDERS] || 0
  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = adminOrdersViewColumns()

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setActiveSubCategoryState(state) {
    SettingsModel.setActiveSubCategoryState(state, ActiveSubCategoryTablesKeys.ADMIN_ORDERS)
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_ORDERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = adminOrdersViewColumns().map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
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
        this.currentOrdersData = ordersData.sort(sortObjectsArrayByFiledDate('updatedAt'))
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

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  onChangeCurPage(e) {
    this.curPage = e
  }
}
