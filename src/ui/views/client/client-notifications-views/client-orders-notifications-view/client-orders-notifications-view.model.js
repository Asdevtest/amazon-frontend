import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'

import {clientOrdersNotificationsViewColumns} from '@components/table-columns/client/client-orders-notifications-columns'

import {clientOrdersNotificationsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export class ClientOrdersNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined
  loadingStatus = undefined

  orders = []
  baseNoConvertedOrders = []

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
  densityModel = 'compact'
  rowHandlers = {
    onTriggerOpenConfirmModal: row => this.onTriggerOpenConfirmModal(row),
    onTriggerOpenRejectModal: row => this.onTriggerOpenRejectModal(row),
  }
  columnsModel = clientOrdersNotificationsViewColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      this.orders = clientOrdersNotificationsDataConverter(
        this.baseNoConvertedOrders.filter(
          order => order.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
        ),
      ).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
    }
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
      this.filterModel = state.filter.filterModel
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

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
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

      this.getDataGridState()
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
        this.error = error.body.message
      }
    }
  }

  onClickTableRow(order) {
    this.history.push({
      pathname: '/client/orders/order',
      search: order.originalData._id,
    })
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
    this.loadingStatus = loadingStatus
  }
}
