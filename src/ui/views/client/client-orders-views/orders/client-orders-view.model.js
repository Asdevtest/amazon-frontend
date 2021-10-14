import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatusByCode} from '@constants/order-status'
import {warehouses} from '@constants/warehouses'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'

import {clientOrdersViewColumns} from '@components/table-columns/client/client-orders-columns'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class ClientOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  orders = []
  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = clientOrdersViewColumns()

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_ORDERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientOrdersViewColumns().map(el => ({...el, hide: state.columns.lookup[el.field].hide}))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  getCurrentData() {
    return toJS(this.orders)
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
        this.orders = result.sort(sortObjectsArrayByFiledDate('createdAt')).map(item => ({
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

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }
}
