import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatusByCode} from '@constants/order-status'
import {warehouses} from '@constants/warehouses'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

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

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.CLIENT_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_ORDERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
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

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }
}
