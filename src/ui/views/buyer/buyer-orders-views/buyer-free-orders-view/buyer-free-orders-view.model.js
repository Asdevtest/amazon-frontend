/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid/data-grid-tables-keys'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/statuses/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {BuyerModel} from '@models/buyer-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {buyerFreeOrdersViewColumns} from '@components/table/table-columns/buyer/buyer-fre-orders-columns'

import {buyerVacantOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

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

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = buyerFreeOrdersViewColumns(this.rowHandlers, this.firstRowId)

  showWarningModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.firstRowId,
      () => this.updateColumnsModel(),
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = this.columnsModel.map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    this.firstRowId = state.sorting.sortedRows[0]

    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.BUYER_FREE_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_FREE_ORDERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = buyerFreeOrdersViewColumns(this.rowHandlers, this.firstRowId).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
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
      {orderId: this.curOrder._id},
    )
  }

  async onClickTableRowBtn(order, noPush) {
    try {
      if (order.originalData.buyer) {
        await BuyerModel.setOrdersAtProcess(order.originalData._id)
      } else {
        await BuyerModel.pickupOrder(order.originalData._id)
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

  onChangeCurPage(e) {
    this.curPage = e
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
