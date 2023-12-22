/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, flow, makeObservable, observable } from 'mobx'

import {
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { ModalsModel } from '@models/model-with-modals'
import { SettingsModel } from '@models/settings-model'

import { IListOfModals } from '@typings/data-grid'

export class DataGridTableModel extends ModalsModel {
  _requestStatus: loadingStatuses = loadingStatuses.success

  _rowCount: number | undefined = undefined
  _sortModel: GridSortModel = [{ field: '', sort: 'desc' }]
  _densityModel = 'compact'
  _paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  _filterModel: GridFilterModel = { items: [] }
  _columnVisibilityModel: GridColumnVisibilityModel = {}
  _selectedRows: string[] = []
  _tableKey: string | undefined = undefined

  _getMainDataMethod: (...args: any) => any
  _columnsModel: GridColDef[]

  _tableData: any[] = []

  get requestStatus() {
    return this._requestStatus
  }
  set requestStatus(requestStatus: loadingStatuses) {
    this._requestStatus = requestStatus
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
  get selectedRows() {
    return this._selectedRows
  }
  get columnVisibilityModel() {
    return this._columnVisibilityModel
  }
  set columnVisibilityModel(columnVisibilityModel: GridColumnVisibilityModel) {
    this._columnVisibilityModel = columnVisibilityModel
  }
  get tableData() {
    return this._tableData
  }
  set tableData(tableData: any[]) {
    this._tableData = tableData
  }

  get getMainDataMethod() {
    return this._getMainDataMethod
  }
  set getMainDataMethod(getMainDataMethod: (...args: any) => any) {
    this._getMainDataMethod = getMainDataMethod
  }

  get columnsModel() {
    return this._columnsModel
  }
  set columnsModel(columnsModel: GridColDef[]) {
    this._columnsModel = columnsModel
  }
  constructor(
    getMainDataMethod: (...args: any) => any,
    columnsModel: GridColDef[],
    history?: History,
    listOfModals?: IListOfModals,
    tableKey?: string,
  ) {
    super(history, listOfModals)

    this._getMainDataMethod = getMainDataMethod
    this._columnsModel = columnsModel
    this._tableKey = tableKey

    makeObservable(this, {
      _requestStatus: observable,
      _rowCount: observable,
      _sortModel: observable,
      _densityModel: observable,
      _paginationModel: observable,
      _filterModel: observable,
      _columnVisibilityModel: observable,
      _selectedRows: observable,
      _tableKey: observable,
      _tableData: observable,
      _getMainDataMethod: observable,
      _columnsModel: observable,

      requestStatus: computed,
      rowCount: computed,
      sortModel: computed,
      densityModel: computed,
      paginationModel: computed,
      selectedRows: computed,
      tableData: computed,
      getMainDataMethod: computed,
      columnsModel: computed,

      setDataGridState: action,
      getDataGridState: action,
      onChangeSortingModel: action,
      onColumnVisibilityModelChange: action,
      onSelectionModel: action,
      onPaginationModelChange: action,
    })
  }

  setDataGridState() {
    if (this._tableKey) {
      const requestState = {
        sortModel: this._sortModel,
        filterModel: this._filterModel,
        paginationModel: this._paginationModel,
        columnVisibilityModel: this._columnVisibilityModel,
      }
      SettingsModel.setDataGridState(requestState, this._tableKey)
    }
  }

  getDataGridState() {
    if (!this._tableKey) return
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

  onColumnVisibilityModelChange(model: GridColumnVisibilityModel) {
    this._columnVisibilityModel = model
    this.setDataGridState()
    this.getMainDataMethod()
  }

  onSelectionModel(selectedRows: string[]) {
    this._selectedRows = selectedRows
  }

  onChangeSortingModel(sortModel: GridSortModel) {
    this._sortModel = sortModel
    this.setDataGridState()
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this._paginationModel = model
    this.setDataGridState()
  }
}
