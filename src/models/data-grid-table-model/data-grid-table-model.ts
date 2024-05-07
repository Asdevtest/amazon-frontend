/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable } from 'mobx'
import { ChangeEvent } from 'react'

import {
  GridCallbackDetails,
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid'
import { GridPinnedColumns } from '@mui/x-data-grid-premium'

import { DefaultModel } from '@models/default-model'
import { TableSettingsModel } from '@models/table-settings'

import { DataGridTableModelParams } from './data-grid-table-model.type'
import { filterModelInitialValue, paginationModelInitialValue } from './model-config'
import { observerConfig } from './observer-config'

export class DataGridTableModel extends DefaultModel {
  unserverSearchValue: string = ''

  densityModel = 'compact'
  sortModel: any = undefined
  paginationModel: GridPaginationModel = paginationModelInitialValue
  filterModel: GridFilterModel = filterModelInitialValue
  columnVisibilityModel: GridColumnVisibilityModel = {}
  selectedRows: string[] = []
  tableKey: string | undefined = undefined

  columnsModel: GridColDef[] = []

  pinnedColumns: GridPinnedColumns = {
    left: [],
    right: [],
  }

  constructor({ getMainDataMethod, columnsModel, tableKey, defaultGetCurrentDataOptions }: DataGridTableModelParams) {
    super({ getMainDataMethod, defaultGetCurrentDataOptions })

    this.columnsModel = columnsModel
    this.tableKey = tableKey

    makeObservable(this, observerConfig)
  }

  setDataGridState() {
    if (!this.tableKey) return

    const requestState = {
      sortModel: this.sortModel,
      filterModel: this.filterModel,
      paginationModel: this.paginationModel,
      columnVisibilityModel: this.columnVisibilityModel,
      pinnedColumns: this.pinnedColumns,
    }

    TableSettingsModel.saveTableSettings(requestState, this.tableKey)
  }

  getDataGridState() {
    if (!this.tableKey) return

    // @ts-ignore
    const state = TableSettingsModel.getTableSettings(this.tableKey)

    if (state) {
      // @ts-ignore
      this.sortModel = state?.sortModel
      // @ts-ignore
      this.filterModel = state?.filterModel
      // @ts-ignore
      this.paginationModel = state?.paginationModel
      // @ts-ignore
      this.columnVisibilityModel = state?.columnVisibilityModel
      // @ts-ignore
      this.pinnedColumns = state?.pinnedColumns
    }
  }

  onColumnVisibilityModelChange(model: GridColumnVisibilityModel, details: GridCallbackDetails, isNotServer?: boolean) {
    this.columnVisibilityModel = model
    if (!isNotServer) {
      this.getCurrentData()
    }
    this.setDataGridState()
  }

  onSelectionModel(selectedRows: string[]) {
    this.selectedRows = selectedRows
  }

  onChangeSortingModel(sortModel: GridSortModel, details: GridCallbackDetails, isNotServer?: boolean) {
    this.sortModel = sortModel

    if (!isNotServer) {
      this.getCurrentData()
    }
    this.setDataGridState()
  }

  onChangeFilterModel(model: GridFilterModel, details: GridCallbackDetails, isNotServer?: boolean) {
    this.filterModel = model
    if (!isNotServer) {
      this.getCurrentData()
    }
    this.setDataGridState()
  }

  onPaginationModelChange(model: GridPaginationModel, details: GridCallbackDetails, isNotServer?: boolean) {
    this.paginationModel = model
    if (!isNotServer) {
      this.getCurrentData()
    }
    this.setDataGridState()
  }

  onChangeUnserverSearchValue(e: ChangeEvent<HTMLInputElement>) {
    this.unserverSearchValue = e.target.value
  }

  handlePinColumn(pinnedColumns: GridPinnedColumns) {
    this.pinnedColumns = pinnedColumns
    this.setDataGridState()
  }
}
