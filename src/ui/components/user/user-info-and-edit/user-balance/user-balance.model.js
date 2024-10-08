import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { OtherModel } from '@models/other-model'
import { TableSettingsModel } from '@models/table-settings'

import { financesViewColumns } from '@components/table/table-columns/admin/finances-columns/finances-columns'

import { financesDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

import { loadingStatus } from '@typings/enums/loading-status'

export class UserBalanceModel {
  history = undefined
  requestStatus = undefined

  userId = undefined
  user = {}
  payments = []

  showReplenishModal = false
  showWithdrawModal = false

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = financesViewColumns()
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor({ history, userId }) {
    this.history = history

    this.userId = userId

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
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

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_USER_FINANCES)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.ADMIN_USER_FINANCES)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()

      await Promise.all([this.getUserInfo(this.userId), this.getBalanceHistory(this.userId)])

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  getCurrentData() {
    return toJS(this.payments)
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onTriggerReplenishModal() {
    this.showReplenishModal = !this.showReplenishModal
  }

  onTriggerWithdrawModal() {
    this.showWithdrawModal = !this.showWithdrawModal
  }

  async getBalanceHistory(id) {
    try {
      const result = await OtherModel.getPaymentsByUserId(id)

      runInAction(() => {
        this.payments = financesDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getUserInfo(id) {
    try {
      const result = await AdministratorModel.getUsersById(id)

      runInAction(() => {
        this.user = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async makePayment(data) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.error = undefined

      await AdministratorModel.makePayment(data)

      await this.getUserInfo(data.recipientId)

      await this.getBalanceHistory(data.recipientId)

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
      this.error = error?.body?.message || error
    }
  }
}
