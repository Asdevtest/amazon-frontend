import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'
import {OtherModel} from '@models/other-model'
import {SettingsModel} from '@models/settings-model'

import {financesViewColumns} from '@components/table-columns/admin/finances-columns/finances-columns'

import {financesDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AdminUserBalanceViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  userId = undefined
  user = {}
  payments = []

  drawerOpen = false
  showReplenishModal = false
  showWithdrawModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = financesViewColumns()

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.userId = location.state.user._id
    }
    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.columnsModel = financesViewColumns()
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_USER_FINANCES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_USER_FINANCES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = financesViewColumns().map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getUserInfo(this.userId)
      await this.getBalanceHistory(this.userId)
      this.getDataGridState()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  getCurrentData() {
    return toJS(this.payments)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerReplenishModal() {
    this.showReplenishModal = !this.showReplenishModal
  }

  onTriggerWithdrawModal() {
    this.showWithdrawModal = !this.showWithdrawModal
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  async getBalanceHistory(id) {
    try {
      const result = await OtherModel.getPaymentsByUserId(id)

      runInAction(() => {
        this.payments = financesDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getUserInfo(id) {
    try {
      const result = await AdministratorModel.getUsersById(id)

      runInAction(() => {
        this.user = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async makePayment(data) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined

      await AdministratorModel.makePayment(data)

      await this.getUserInfo(data.recipientId)

      await this.getBalanceHistory(data.recipientId)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }
}
