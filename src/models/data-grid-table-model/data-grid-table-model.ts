/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable } from 'mobx'

import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { GridPinnedColumns } from '@mui/x-data-grid-premium'

import { DefaultModel } from '@models/default-model'
import { TableSettingsModel } from '@models/table-settings'

import { IGridColumn } from '@typings/shared/grid-column'

import { DataGridTableModelParams } from './data-grid-table-model.type'
import { defaultPinnedColumns, filterModelInitialValue, paginationModelInitialValue } from './model-config'
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
  pinnedColumns: GridPinnedColumns = defaultPinnedColumns

  get filteredData() {
    if (this.fieldsForSearch?.length) {
      const searchValue = this.currentSearchValue.toLowerCase()

      return this.currentData?.filter((item: any) => this.checkNestedFields(item, searchValue, this.fieldsForSearch))
    } else {
      return this.currentData
    }
  }

  get isSomeFilterOn() {
    return !!this.filterModel?.items?.length
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
      const sortModel = state?.sortModel

      if (sortModel?.length > 0) {
        this.sortModel = sortModel
      }
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

  onChangeUnserverSearchValue(value: string) {
    this.currentSearchValue = value
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

  onClickResetFilters() {
    this.filterModel = filterModelInitialValue
  }

  setDefaultPinnedColumns() {
    this.pinnedColumns = defaultPinnedColumns
  }

  /**
   * Recursively checks an object for string values starting with a specified search value,
   * in the specified fields and all their nested objects.
   * @param {object} obj - The object to check.
   * @param {string} searchValue - The search value (case insensitive).
   * @param {string[]} fieldsForSearch - Array of fields to search within.
   * @returns {boolean} Returns true if any field of the object or its nested objects starts with the search value, otherwise false.
   */
  checkNestedFields(obj: any, searchValue: string, fieldsForSearch: string[]): boolean {
    if (typeof obj !== 'object' || obj === null) {
      return false
    }

    return Object.keys(obj).some(key => {
      if (fieldsForSearch.includes(key) && typeof obj[key] === 'string') {
        return obj[key].toLowerCase().startsWith(searchValue)
      } else if (Array.isArray(obj[key])) {
        return false
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        return this.checkNestedFields(obj[key], searchValue, fieldsForSearch)
      }
      return false
    })
  }
}
