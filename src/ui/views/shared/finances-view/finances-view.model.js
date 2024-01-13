import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { filterModelInitialValue } from '@models/data-grid-table-model'
import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'

import { financesViewColumns } from '@components/table/table-columns/admin/finances-columns/finances-columns'

import { financesDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

export class FinancesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

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

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location?.state?.dataGridFilter) {
        this.startFilterModel = location.state.dataGridFilter
      }
    })

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SHARED_FINANCES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SHARED_FINANCES]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
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
      runInAction(() => {
        this.error = error
        this.currentFinancesData = []
      })
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await this.getPayments()
      this.getDataGridState()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  getCurrentData() {
    return toJS(this.currentFinancesData)
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.rowSelectionModel = model
    })
  }

  onClickResetFilters() {
    this.filterModel = filterModelInitialValue
  }
}
