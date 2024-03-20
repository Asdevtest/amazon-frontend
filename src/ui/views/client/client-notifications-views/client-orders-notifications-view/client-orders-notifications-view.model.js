import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { SettingsModel } from '@models/settings-model'

import { clientOrdersNotificationsViewColumns } from '@components/table/table-columns/client/client-orders-notifications-columns'

import { clientOrdersNotificationsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export class ClientOrdersNotificationsViewModel {
  history = undefined
  requestStatus = undefined

  orders = []
  baseNoConvertedOrders = []

  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    onClickOkBtn: () => this.onSaveProductData(),
  }

  rowHandlers = {
    onTriggerOpenConfirmModal: row => this.onTriggerOpenConfirmModal(row),
    onTriggerOpenRejectModal: row => this.onTriggerOpenRejectModal(row),
  }

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = clientOrdersNotificationsViewColumns(this.rowHandlers)
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get currentData() {
    return this.orders
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_ORDERS_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_ORDERS_NOTIFICATIONS]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onTriggerOpenConfirmModal(row) {
    this.confirmModalSettings = {
      isWarning: false,
      message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(
        row.totalPriceChanged - row.totalPrice,
        2,
      )} ${t(TranslationKey['Do you confirm the extra payment?'])}`,
      onClickOkBtn: () => this.onClickConfirmOrderPriceChangeBtn(row),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenRejectModal(row) {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Do you want to cancel?']),
      onClickOkBtn: () => this.onClickRejectOrderPriceChangeBtn(row),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getOrders()
    } catch (error) {
      console.log(error)
    }
  }

  async getOrders() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await ClientModel.getOrders(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE])

      runInAction(() => {
        this.baseNoConvertedOrders = result
        this.orders = clientOrdersNotificationsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
        this.rowCount = result.length
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)

      runInAction(() => {
        this.baseNoConvertedOrders = []
        this.orders = []
      })
    }
  }

  onClickTableRow(order) {
    this.history.push({
      pathname: '/client/my-orders/orders/order',
      search: `orderId=${order.originalData._id}`,
    })
  }

  async onClickConfirmOrderPriceChangeBtn(order) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await ClientModel.orderConfirmPriceChange(order._id)
      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onClickRejectOrderPriceChangeBtn(order) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await ClientModel.cancelOrder(order._id)
      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.IS_LOADING)
    }
  }
}
