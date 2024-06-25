/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable } from 'mobx'
import { ChangeEvent } from 'react'

import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { GridPinnedColumns } from '@mui/x-data-grid-premium'

import { DefaultModel } from '@models/default-model'
import { TableSettingsModel } from '@models/table-settings'

import { IGridColumn } from '@typings/shared/grid-column'

import { DataGridTableModelParams } from './data-grid-table-model.type'
import { filterModelInitialValue, paginationModelInitialValue } from './model-config'
import { observerConfig } from './observer-config'

export class DataGridTableModel extends DefaultModel {
  currentSearchValue: string = ''

  densityModel = 'compact'
  sortModel: any = undefined
  paginationModel: GridPaginationModel = paginationModelInitialValue
  filterModel: GridFilterModel = filterModelInitialValue
  columnVisibilityModel: GridColumnVisibilityModel = {}
  selectedRows: string[] = []
  tableKey: string | undefined = undefined

  columnsModel: IGridColumn[] = []

  fieldsForSearch: string[] = []

  pinnedColumns: GridPinnedColumns = {
    left: [],
    right: [],
  }

  get filteredData() {
    if (this.fieldsForSearch?.length) {
      return this.currentData?.filter((item: any) =>
        this.fieldsForSearch.some(field =>
          item?.[field]?.toLowerCase().includes(this.currentSearchValue.toLowerCase()),
        ),
      )
    } else {
      return this.currentData
    }
  }

  constructor({
    getMainDataMethod,
    columnsModel,
    tableKey,
    defaultGetCurrentDataOptions,
    fieldsForSearch,
  }: DataGridTableModelParams) {
    super({ getMainDataMethod, defaultGetCurrentDataOptions })

    if (fieldsForSearch) {
      this.fieldsForSearch = fieldsForSearch
    }

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

  onColumnVisibilityModelChange(model: GridColumnVisibilityModel) {
    this.columnVisibilityModel = model
    this.setDataGridState()
  }

  onChangeSortingModel(sortModel: GridSortModel) {
    this.sortModel = sortModel
    this.setDataGridState()
  }

  onChangeFilterModel(model: GridFilterModel) {
    this.filterModel = model
    this.setDataGridState()
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this.paginationModel = model
    this.setDataGridState()
  }

  onSelectionModel(selectedRows: string[]) {
    this.selectedRows = selectedRows
  }

  onChangeUnserverSearchValue(e: ChangeEvent<HTMLInputElement>) {
    this.currentSearchValue = e.target.value
  }

  handlePinColumn(pinnedColumns: GridPinnedColumns) {
    this.pinnedColumns = pinnedColumns
    this.setDataGridState()
  }

  handleHideColumns(columnsToHide: string[]) {
    columnsToHide.forEach(el => {
      this.columnVisibilityModel[el] = false
    })
  }
}
