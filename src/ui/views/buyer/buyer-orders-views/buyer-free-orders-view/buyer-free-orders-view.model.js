import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'

import { BuyerModel } from '@models/buyer-model'
import { filterModelInitialValue } from '@models/data-grid-table-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { buyerVacantOrdersDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

import { loadingStatus } from '@typings/enums/loading-status'

import { buyerFreeOrdersViewColumns } from './buyer-free-orders-columns'

export class BuyerFreeOrdersViewModel {
  history = undefined
  requestStatus = undefined

  curOrder = undefined
  selectedRowIds = []
  ordersVacant = []
  showTwoVerticalChoicesModal = false

  rowHandlers = {
    onClickTableRowBtn: item => this.onClickTableRowBtn(item),
  }
  sortModel = []
  filterModel = filterModelInitialValue
  columnsModel = buyerFreeOrdersViewColumns(this.rowHandlers)
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get currentData() {
    return this.ordersVacant
  }

  get isSomeFilterOn() {
    return !!this.filterModel?.items?.length
  }

  constructor({ history }) {
    this.history = history

    const orderId = new URL(window.location.href)?.searchParams?.get('orderId')

    if (orderId) {
      this.history.push(`${history.location.pathname}`)
      this.onChangeFilterModel({
        items: [
          {
            field: 'ID',
            operator: '=',
            value: orderId,
          },
        ],
      })

      this.getOrdersVacant()
    }

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

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      // filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.BUYER_FREE_ORDERS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.BUYER_FREE_ORDERS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      // this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
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

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getOrdersVacant()
    } catch (error) {
      console.error(error)
    }
  }

  async getOrdersVacant() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await BuyerModel.getOrdersVacant()

      runInAction(() => {
        this.ordersVacant = buyerVacantOrdersDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  goToMyOrders() {
    this.onTriggerOpenModal('showTwoVerticalChoicesModal')

    this.history.push(
      this.curOrder.status === OrderStatusByKey[OrderStatus.FORMED]
        ? '/buyer/pending-orders'
        : '/buyer/not-paid-orders',
      { orderId: this.curOrder._id },
    )
  }

  async onClickTableRowBtn(order, noPush) {
    const { status, buyer } = order.originalData

    try {
      if (!buyer || status === OrderStatusByKey[OrderStatus.FORMED] || status === OrderStatusByKey[OrderStatus.NEW]) {
        await BuyerModel.pickupOrder(order.originalData._id)
      } else {
        await BuyerModel.setOrdersAtProcess(order.originalData._id)
      }

      if (!noPush) {
        runInAction(() => {
          this.curOrder = order.originalData
        })

        this.onTriggerOpenModal('showTwoVerticalChoicesModal')
      }

      this.loadData()

      UserModel.getUsersInfoCounters()
    } catch (error) {
      console.error(error)
    }
  }

  async onPickupSomeItems() {
    try {
      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const selectedItem = this.ordersVacant.find(item => item.originalData._id === this.selectedRowIds[i])

        if (selectedItem) {
          await this.onClickTableRowBtn(selectedItem, true)
        }
      }

      runInAction(() => {
        this.selectedRowIds = []
      })

      UserModel.getUsersInfoCounters()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickContinueWorkButton() {
    this.onTriggerOpenModal('showTwoVerticalChoicesModal')
    this.loadData()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onClickResetFilters() {
    this.filterModel = filterModelInitialValue
  }
}
