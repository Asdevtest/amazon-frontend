/* eslint-disable no-unused-vars */
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { buyerFreeOrdersViewColumns } from '@components/table/table-columns/buyer/buyer-fre-orders-columns'

import { buyerVacantOrdersDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

export class BuyerFreeOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  curOrder = undefined

  ordersVacant = []
  showBarcodeModal = false
  showOrderModal = false
  showTwoVerticalChoicesModal = false

  warningTitle = ''

  rowHandlers = {
    onClickTableRowBtn: item => this.onClickTableRowBtn(item),
  }

  selectedRowIds = []

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = buyerFreeOrdersViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  showWarningModal = false

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

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      // filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.BUYER_FREE_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_FREE_ORDERS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        // this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
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
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  getCurrentData() {
    return toJS(this.ordersVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getOrdersVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getOrdersVacant() {
    try {
      const result = await BuyerModel.getOrdersVacant()

      runInAction(() => {
        this.ordersVacant = buyerVacantOrdersDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      this.ordersVacant = []
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
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
        this.curOrder = order.originalData

        this.onTriggerOpenModal('showTwoVerticalChoicesModal')
      }

      this.loadData()

      UserModel.getUserInfo()
    } catch (error) {
      this.warningTitle = t(TranslationKey['Not found'])

      this.onTriggerOpenModal('showWarningModal')

      this.loadData()
      console.log(error)
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

      this.selectedRowIds = []

      this.warningTitle = t(TranslationKey['Taken to Work'])

      this.onTriggerOpenModal('showWarningModal')
      UserModel.getUserInfo()
      this.loadData()
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }
  onClickContinueWorkButton() {
    this.onTriggerOpenModal('showTwoVerticalChoicesModal')
    this.loadData()
  }

  onTriggerShowOrderModal() {
    this.showOrderModal = !this.showOrderModal
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
