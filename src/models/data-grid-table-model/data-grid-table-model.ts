/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'

import {
  GridCallbackDetails,
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid'

import { ModalsModel } from '@models/model-with-modals'
import { SettingsModel } from '@models/settings-model'

import { loadingStatus } from '@typings/enums/loading-status'

import { DataGridTableModelParams } from './data-grid-table-model.type'
import { filterModelInitialValue, paginationModelInitialValue } from './model-config'
import { observerConfig } from './observer-config'

export class DataGridTableModel extends ModalsModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS

  unserverSearchValue: string = ''

  densityModel = 'compact'
  rowCount = 0
  sortModel: any = undefined
  paginationModel: GridPaginationModel = paginationModelInitialValue
  filterModel: GridFilterModel = filterModelInitialValue
  columnVisibilityModel: GridColumnVisibilityModel = {}
  selectedRows: string[] = []
  tableKey: string | undefined = undefined

  getMainDataMethod: any
  columnsModel: GridColDef[] = []
  tableData: any[] = []

  defaultGetDataMethodOptions: any

  constructor({ getMainDataMethod, columnsModel, tableKey, defaultGetDataMethodOptions }: DataGridTableModelParams) {
    super()

    this.getMainDataMethod = getMainDataMethod
    this.columnsModel = columnsModel
    this.tableKey = tableKey
    this.defaultGetDataMethodOptions = defaultGetDataMethodOptions

    makeObservable(this, observerConfig)
  }

  setDataGridState() {
    if (!this.tableKey) return

    const requestState = {
      sortModel: this.sortModel,
      filterModel: this.filterModel,
      paginationModel: this.paginationModel,
      columnVisibilityModel: this.columnVisibilityModel,
    }

    SettingsModel.setDataGridState(requestState, this.tableKey)
  }

  getDataGridState() {
    if (!this.tableKey) return
    const state = SettingsModel.dataGridState[this.tableKey as keyof typeof SettingsModel.dataGridState]

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

  onColumnVisibilityModelChange(model: GridColumnVisibilityModel, details: GridCallbackDetails, isNotServer?: boolean) {
    this.columnVisibilityModel = model
    if (!isNotServer) {
      this.getMainTableData()
    }
    this.setDataGridState()
  }

  onSelectionModel(selectedRows: string[]) {
    this.selectedRows = selectedRows
  }

  onChangeSortingModel(sortModel: GridSortModel, details: GridCallbackDetails, isNotServer?: boolean) {
    this.sortModel = sortModel

    if (!isNotServer) {
      this.getMainTableData()
    }
    this.setDataGridState()
  }

  onChangeFilterModel(model: GridFilterModel, details: GridCallbackDetails, isNotServer?: boolean) {
    this.filterModel = model
    if (!isNotServer) {
      this.getMainTableData()
    }
    this.setDataGridState()
  }

  onPaginationModelChange(model: GridPaginationModel, details: GridCallbackDetails, isNotServer?: boolean) {
    this.paginationModel = model
    if (!isNotServer) {
      this.getMainTableData()
    }
    this.setDataGridState()
  }

  async getMainTableData(options?: any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await this?.getMainDataMethod(options || this.defaultGetDataMethodOptions?.())

      runInAction(() => {
        this.tableData = result?.rows || result
        this.rowCount = result?.count || result.length
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }

  onChangeUnserverSearchValue(e: ChangeEvent<HTMLInputElement>) {
    this.unserverSearchValue = e.target.value
  }

  handleHideColumns(columnsToHide: string[]) {
    columnsToHide.forEach(el => {
      this.columnVisibilityModel[el] = false
    })
  }
}
