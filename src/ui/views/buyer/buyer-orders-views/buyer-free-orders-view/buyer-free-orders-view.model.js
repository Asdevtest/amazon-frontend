import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'
import {SettingsModel} from '@models/settings-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class BuyerFreeOrdersViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined

  ordersVacant = []
  drawerOpen = false
  showBarcodeModal = false
  showOrderModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  showWarningModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.BUYER_FREE_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_FREE_ORDERS]

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
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.ordersVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getOrdersVacant()
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
        this.ordersVacant = result.sort(sortObjectsArrayByFiledDate('createDate')).map(order => ({
          ...order,
          id: order._id,
        }))
      })
    } catch (error) {
      this.ordersVacant = []
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickTableRowBtn(order) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await BuyerModel.pickupOrder(order._id)
      this.onTriggerOpenModal('showWarningModal')
      this.setActionStatus(loadingStatuses.success)
      this.loadData()
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onTriggerShowOrderModal() {
    this.showOrderModal = !this.showOrderModal
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
