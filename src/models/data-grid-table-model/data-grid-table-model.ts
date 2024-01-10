/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'

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

import { filterModelInitialValue, paginationModelInitialValue, sortModelInitialValue } from './model-config'
import { observerConfig } from './observer-config'

export class DataGridTableModel extends ModalsModel {
  _requestStatus: loadingStatuses = loadingStatuses.SUCCESS

  _unserverSearchValue = ''
  get unserverSearchValue() {
    return this._unserverSearchValue
  }
  set unserverSearchValue(unserverSearchValue: string) {
    this._unserverSearchValue = unserverSearchValue
  }

  _densityModel = 'compact'
  _rowCount = 0
  _sortModel: GridSortModel = sortModelInitialValue
  _paginationModel: GridPaginationModel = paginationModelInitialValue
  _filterModel: GridFilterModel = filterModelInitialValue
  _columnVisibilityModel: GridColumnVisibilityModel = {}
  _selectedRows: string[] = []
  _tableKey: string | undefined = undefined

  _getMainDataMethod: (...args: any) => any
  _columnsModel: GridColDef[]
  _tableData: any[] = []

  _defaultGetDataMethodOptions: any = {}

  get requestStatus() {
    return this._requestStatus
  }
  set requestStatus(requestStatus: loadingStatuses) {
    this._requestStatus = requestStatus
  }
  get rowCount() {
    return this._rowCount
  }
  set rowCount(rowCount: number) {
    this._rowCount = rowCount
  }
  get sortModel() {
    return this._sortModel
  }
  set sortModel(sortModel: GridSortModel) {
    this._sortModel = sortModel
  }
  get densityModel() {
    return this._densityModel
  }
  get paginationModel() {
    return this._paginationModel
  }
  set paginationModel(paginationModel: GridPaginationModel) {
    this._paginationModel = paginationModel
  }
  get selectedRows() {
    return this._selectedRows
  }
  set selectedRows(selectedRows: string[]) {
    this._selectedRows = selectedRows
  }
  get filterModel() {
    return this._filterModel
  }
  set filterModel(filterModel: GridFilterModel) {
    this._filterModel = filterModel
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

  get defaultGetDataMethodOptions() {
    return this._defaultGetDataMethodOptions
  }
  set defaultGetDataMethodOptions(defaultGetDataMethodOptions: any) {
    this._defaultGetDataMethodOptions = defaultGetDataMethodOptions
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
    tableKey?: string,
    defaultGetDataMethodOptions?: any,
  ) {
    super()

    this._getMainDataMethod = getMainDataMethod
    this._columnsModel = columnsModel
    this._tableKey = tableKey
    this.defaultGetDataMethodOptions = defaultGetDataMethodOptions

    makeObservable(this, observerConfig)
  }

  setDataGridState() {
    if (!this._tableKey) return

    const requestState = {
      sortModel: this.sortModel,
      filterModel: this.filterModel,
      paginationModel: this.paginationModel,
      columnVisibilityModel: this.columnVisibilityModel,
    }
    SettingsModel.setDataGridState(requestState, this._tableKey)
  }

  getDataGridState() {
    if (!this._tableKey) return

    const state = SettingsModel.dataGridState[this._tableKey as keyof typeof SettingsModel.dataGridState]
    if (state) {
      // @ts-ignore
      this.sortModel = state?.sortModel
      // @ts-ignore
      this.filterModel = state?.filterModel
      // @ts-ignore
      this.paginationModel = state?.paginationModel
      // @ts-ignore
      this.columnVisibilityModel = state?.columnVisibilityModel
    }
  }

  onColumnVisibilityModelChange(model: GridColumnVisibilityModel, isNotServer?: boolean) {
    this.columnVisibilityModel = model
    if (!isNotServer) {
      this.getMainTableData()
    }
    this.setDataGridState()
  }

  onSelectionModel(selectedRows: string[]) {
    this.selectedRows = selectedRows
  }

  onChangeSortingModel(sortModel: GridSortModel, isNotServer?: boolean) {
    this.sortModel = sortModel
    if (!isNotServer) {
      this.getMainTableData()
    }
    this.setDataGridState()
  }

  onChangeFilterModel(model: GridFilterModel, isNotServer?: boolean) {
    this.filterModel = model
    if (!isNotServer) {
      this.getMainTableData()
    }
    this.setDataGridState()
  }

  onPaginationModelChange(model: GridPaginationModel, isNotServer?: boolean) {
    this.paginationModel = model
    if (!isNotServer) {
      this.getMainTableData()
    }
    this.setDataGridState()
  }

  async getMainTableData(options?: any) {
    try {
      this.requestStatus = loadingStatuses.IS_LOADING

      const result = await this.getMainDataMethod(options || this.defaultGetDataMethodOptions)

      runInAction(() => {
        this.tableData = result?.rows || result
        this.rowCount = result?.count || result.length
      })

      this.requestStatus = loadingStatuses.SUCCESS

      return result
    } catch (error) {
      console.log(error)
      this.requestStatus = loadingStatuses.FAILED
    }
  }

  onChangeUnserverSearchValue(e: ChangeEvent<HTMLInputElement>) {
    this.unserverSearchValue = e.target.value
  }
}
