import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatusByCode} from '@constants/order-status'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'

import {clientOrdersNotificationsViewColumns} from '@components/table-columns/client/client-orders-notifications-columns'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersNotificationsView

export class ClientOrdersNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined
  loadingStatus = undefined

  orders = []
  drawerOpen = false
  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    onClickOkBtn: () => this.onSaveProductData(),
  }
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  rowHandlers = {
    onTriggerOpenConfirmModal: (type, row) => this.onTriggerOpenConfirmModal(type, row),
    onTriggerOpenModal: (type, row) => this.onTriggerOpenModal(type, row),
  }
  columnsModel = clientOrdersNotificationsViewColumns(this.rowHandlers)

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
    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_ORDERS_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_ORDERS_NOTIFICATIONS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientOrdersNotificationsViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onTriggerOpenConfirmModal(modal, row) {
    this.confirmModalSettings = {
      isWarning: false,
      message: textConsts.confirmMessage,
      onClickOkBtn: () => this.onClickConfirmOrderPriceChangeBtn(row),
    }
    this[modal] = !this[modal]
  }

  onTriggerOpenModal(modal, row) {
    this.confirmModalSettings = {
      isWarning: true,
      message: textConsts.errorMessage,
      onClickOkBtn: () => this.onClickRejectOrderPriceChangeBtn(row),
    }
    this[modal] = !this[modal]
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

      console.log('result', result)

      runInAction(() => {
        this.orders = result
          .filter(order => order.totalPrice < order.totalPriceChanged)
          .sort(sortObjectsArrayByFiledDate('createdAt'))
          .map(item => ({
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

  async onClickConfirmOrderPriceChangeBtn(order) {
    try {
      this.setLoadingStatus(loadingStatuses.isLoading)
      await ClientModel.orderConfirmPriceChange(order._id)
      this.loadData()
      this.setLoadingStatus(loadingStatuses.success)
    } catch (error) {
      console.warn(error)
      this.setLoadingStatus(loadingStatuses.failed)
    }
  }

  async onClickRejectOrderPriceChangeBtn(order) {
    try {
      this.setLoadingStatus(loadingStatuses.isLoading)
      await ClientModel.orderRejectriceChange(order._id)
      this.loadData()
      this.setLoadingStatus(loadingStatuses.success)
    } catch (error) {
      console.warn(error)
      this.setLoadingStatus(loadingStatuses.isLoading)
    }
  }

  setLoadingStatus(loadingStatus) {
    this.loadingStatus = loadingStatus
  }
}
