import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
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
  actionStatus = undefined
  error = undefined
  loadingStatus = undefined

  orders = []
  baseNoConvertedOrders = []

  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    onClickOkBtn: () => this.onSaveProductData(),
  }
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  rowHandlers = {
    onTriggerOpenConfirmModal: row => this.onTriggerOpenConfirmModal(row),
    onTriggerOpenRejectModal: row => this.onTriggerOpenRejectModal(row),
  }
  columnsModel = clientOrdersNotificationsViewColumns(this.rowHandlers)
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
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

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onTriggerOpenConfirmModal(row) {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(
          row.totalPriceChanged - row.totalPrice,
          2,
        )} ${t(TranslationKey['Do you confirm the extra payment?'])}`,
        onClickOkBtn: () => this.onClickConfirmOrderPriceChangeBtn(row),
      }
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenRejectModal(row) {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: true,
        message: t(TranslationKey['Do you want to cancel?']),
        onClickOkBtn: () => this.onClickRejectOrderPriceChangeBtn(row),
      }
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedRowIds = model
    })
  }

  getCurrentData() {
    return toJS(this.orders)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getDataGridState()
      await this.getOrders()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async getOrders() {
    try {
      const result = await ClientModel.getOrders(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE])

      runInAction(() => {
        this.baseNoConvertedOrders = result

        this.orders = clientOrdersNotificationsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
          this.baseNoConvertedOrders = []
          this.orders = []
        })
      }
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
      this.setLoadingStatus(loadingStatuses.isLoading)
      await ClientModel.orderConfirmPriceChange(order._id)

      this.onTriggerOpenModal('showConfirmModal')
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
      await ClientModel.cancelOrder(order._id)
      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
      this.setLoadingStatus(loadingStatuses.success)
    } catch (error) {
      console.warn(error)
      this.setLoadingStatus(loadingStatuses.isLoading)
    }
  }

  setLoadingStatus(loadingStatus) {
    runInAction(() => {
      this.loadingStatus = loadingStatus
    })
  }
}
