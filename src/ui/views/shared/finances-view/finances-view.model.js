import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { filterModelInitialValue } from '@models/data-grid-table-model'
import { OtherModel } from '@models/other-model'
import { TableSettingsModel } from '@models/table-settings'

import { financesViewColumns } from '@components/table/table-columns/admin/finances-columns/finances-columns'

import { financesDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

export class FinancesViewModel {
  history = undefined
  requestStatus = undefined

  currentFinancesData = []

  rowSelectionModel = undefined
  sortModel = []
  startFilterModel = undefined
  filterModel = filterModelInitialValue
  densityModel = 'compact'
  columnsModel = financesViewColumns()
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get isSomeFilterOn() {
    return !!this.filterModel?.items?.length
  }

  get currentData() {
    return this.currentFinancesData
  }

  constructor({ history }) {
    this.history = history

    if (history.location?.state?.dataGridFilter) {
      this.startFilterModel = history.location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    this.filterModel = model
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

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.SHARED_FINANCES)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.SHARED_FINANCES)

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

  async getPayments() {
    try {
      const result = await OtherModel.getMyPayments()

      runInAction(() => {
        this.currentFinancesData = financesDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.log(error)
    }
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getPayments()
    } catch (error) {
      console.log(error)
    }
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onClickResetFilters() {
    this.filterModel = filterModelInitialValue
  }
}
