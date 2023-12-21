/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { ModalsModel } from '@models/model-with-modals'

import { IListOfModals, IPaginationModel, ISortModel } from '@typings/data-grid'

export class DataGridTableModel extends ModalsModel {
  private _tableMainData: any[] = []
  private _requestStatus: loadingStatuses = loadingStatuses.success
  private _rowCount: number | undefined
  private _sortModel: GridSortModel = [{ field: '', sort: 'desc' }]
  private _densityModel = 'compact'
  private _paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  private _filterModel: GridFilterModel = { items: [] }
  private _columnVisibilityModel: GridColumnVisibilityModel = {}

  get tableMainData() {
    return this._tableMainData
  }
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

  constructor(history?: History, listOfModals?: IListOfModals) {
    super(history, listOfModals)
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

    // SettingsModel.setDataGridState(requestState, this.currentSettings.dataGridKey)
  }
}
