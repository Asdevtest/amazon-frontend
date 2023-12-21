/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { ModalsModel } from '@models/model-with-modals'
import { SettingsModel } from '@models/settings-model'

import { IListOfModals } from '@typings/data-grid'

export class DataGridTableModel extends ModalsModel {
  private _requestStatus: loadingStatuses = loadingStatuses.success

  private _rowCount: number | undefined
  private _sortModel: GridSortModel = [{ field: '', sort: 'desc' }]
  private _densityModel = 'compact'
  private _paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  private _filterModel: GridFilterModel = { items: [] }
  private _columnVisibilityModel: GridColumnVisibilityModel = {}

  private _tableKey: string | undefined

  get requestStatus() {
    return this._requestStatus
  }
  get rowCount() {
    return this._rowCount
  }
  get sortModel() {
    return this._sortModel
  }
  get densityModel() {
    return this._densityModel
  }
  get paginationModel() {
    return this._paginationModel
  }

  constructor(history?: History, listOfModals?: IListOfModals, tableKey?: string) {
    super(history, listOfModals)

    this._tableKey = tableKey
  }

  onChangeSortingModel(sortModel: GridSortModel) {
    this._sortModel = sortModel
    // this.setDataGridState()
    // this.getIdeaList()
  }

  setDataGridState() {
    const requestState = {
      sortModel: this._sortModel,
      filterModel: this._filterModel,
      paginationModel: this._paginationModel,
      columnVisibilityModel: this._columnVisibilityModel,
    }
    SettingsModel.setDataGridState(requestState, this._tableKey)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this._tableKey as keyof typeof SettingsModel.dataGridState]
    if (state) {
      // @ts-ignore
      this._sortModel = state?.sortModel
      // @ts-ignore
      this._filterModel = state?.filterModel
      // @ts-ignore
      this._paginationModel = state?.paginationModel
      // @ts-ignore
      this._columnVisibilityModel = state?.columnVisibilityModel
    }
  }
}
