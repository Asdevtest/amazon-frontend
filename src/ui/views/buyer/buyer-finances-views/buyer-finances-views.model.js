import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {OtherModel} from '@models/other-model'
import {SettingsModel} from '@models/settings-model'

import {financesViewColumns} from '@components/table-columns/admin/finances-columns/finances-columns'

import {financesDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class BuyerFinancesViewsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  currentFinancesData = []

  selectionModel = undefined

  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = financesViewColumns()

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.BUYER_FINANCES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_FINANCES]

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

  async getPayments() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await OtherModel.getMyPayments()

      runInAction(() => {
        this.currentFinancesData = financesDataConverter(result).sort(sortObjectsArrayByFiledDate('createdAt'))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
      this.currentFinancesData = []
    }
  }

  getCurrentData() {
    return toJS(this.currentFinancesData)
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
}
