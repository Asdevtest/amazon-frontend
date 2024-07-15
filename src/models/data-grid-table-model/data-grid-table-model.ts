/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridPinnedColumns } from '@mui/x-data-grid-premium'

import { DefaultModel } from '@models/default-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { ITablePreset } from '@typings/models/user/table-preset'
import { IGridColumn } from '@typings/shared/grid-column'

import { DataGridTableModelParams } from './data-grid-table-model.type'
import { filterModelInitialValue, paginationModelInitialValue, pinnedColumnsInitialValue } from './model-config'
import { observerConfig } from './observer-config'

export class DataGridTableModel extends DefaultModel {
  currentSearchValue: string = ''

  densityModel = 'compact'

  sortModel: any = undefined
  defaultSortModel: any = undefined

  paginationModel: GridPaginationModel = paginationModelInitialValue
  filterModel: GridFilterModel = filterModelInitialValue
  columnVisibilityModel: GridColumnVisibilityModel = {}

  selectedRows: string[] = []
  tableKey: string | undefined = undefined

  columnsModel: IGridColumn[] = []
  defaultColumnsModel: IGridColumn[] = []

  fieldsForSearch: string[] = []

  pinnedColumns = pinnedColumnsInitialValue

  presetsTableData: ITablePreset[] = []

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

  get isSomeFilterOn() {
    return !!this.filterModel?.items?.length
  }

  constructor({
    getMainDataMethod,
    columnsModel,
    tableKey,
    defaultGetCurrentDataOptions,
    fieldsForSearch,
    defaultSortModel,
    defaultColumnsModel,
  }: DataGridTableModelParams) {
    super({ getMainDataMethod, defaultGetCurrentDataOptions })

    if (fieldsForSearch) {
      this.fieldsForSearch = fieldsForSearch
    }

    if (defaultSortModel) {
      this.defaultSortModel = defaultSortModel
    }

    this.columnsModel = columnsModel
    this.defaultColumnsModel = defaultColumnsModel

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

  onClickResetFilters() {
    this.filterModel = filterModelInitialValue
  }

  async handleSetPresetActive(presetId: string) {
    if (presetId) {
      this.handleSetActivePreset(presetId)
    } else {
      this.handleUnsetAllPresets()
    }
  }

  async handleCreateTableSettingsPreset(title: string) {
    try {
      const presetToCreate: any = {
        settings: {},
        title,
        endpoint: this.tableKey,
        activeSetting: true,
      }

      const result = await UserModel.createTableSettingsPreset(presetToCreate)

      presetToCreate._id = result.guid

      runInAction(() => {
        this.presetsTableData = this.presetsTableData.map(preset => ({
          ...preset,
          activeSetting: false,
        }))

        this.presetsTableData.push(presetToCreate)
      })

      toast.success('Preset created successfully')
    } catch (error) {
      console.error(error)
    }
  }

  async getTableSettingsPreset() {
    try {
      const result = await UserModel.getTableSettingsPreset(`endpoint[$eq]=${this.tableKey}`)

      runInAction(() => {
        this.presetsTableData = result as ITablePreset[]
      })

      this.setSettingsFromActivePreset()
    } catch (error) {
      console.error(error)
    }
  }

  async handleDeleteTableSettingsPreset(presetId: string) {
    try {
      await UserModel.deleteUsersPresetsByGuid(presetId)

      runInAction(() => {
        this.presetsTableData = this.presetsTableData.filter(preset => preset._id !== presetId)
      })

      toast.success('Preset deleted successfully')
    } catch (error) {
      console.error(error)
    }
  }

  async handleUpdateTableSettingsPreset(presetId: string, body: any) {
    try {
      // @ts-ignore
      const fields = body?.map(column => ({
        field: column.field,
        width: column.width,
      }))

      const settings = {
        sortModel: this?.sortModel,
        paginationModel: this?.paginationModel,
        pinnedColumns: this?.pinnedColumns,
        fields,
      }

      await UserModel.patchPresetSettings(presetId, { settings })

      runInAction(() => {
        for (const preset of this.presetsTableData) {
          if (preset._id === presetId) {
            preset.settings = settings
          }
        }
      })

      toast.success('Preset updated successfully')
    } catch (error) {
      console.error(error)
    }
  }

  setSettingsFromActivePreset() {
    const activePreset = this.getActivePreset()

    if (activePreset) {
      // @ts-ignore
      this.columnsModel = activePreset?.settings?.fields?.map(item => {
        const foundColumn = this.columnsModel.find(column => column.field === item?.field)

        if (foundColumn) {
          foundColumn.width = item?.width
        }

        return foundColumn
      })

      this.sortModel = activePreset?.settings?.sortModel
      this.pinnedColumns = activePreset?.settings?.pinnedColumns
      this.paginationModel = activePreset?.settings?.paginationModel
    } else {
      this.columnsModel = this.defaultColumnsModel.map(item => item)

      console.log('this.columnsModel :>> ', this.columnsModel)
      console.log('this.defaultColumnsModel :>> ', this.defaultColumnsModel)

      this.sortModel = this.defaultSortModel
      this.pinnedColumns = {
        left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
        right: [],
      }
      this.paginationModel = paginationModelInitialValue
    }

    this.getCurrentData()
  }

  getActivePreset() {
    return this.presetsTableData.find(preset => preset.activeSetting) as ITablePreset
  }

  async handleSetActivePreset(presetId: string) {
    try {
      await UserModel.patchPresetSettings(presetId, { activeSetting: true })

      runInAction(() => {
        this.presetsTableData = this.presetsTableData.map(preset => {
          if (preset._id === presetId) {
            preset.activeSetting = true
          } else {
            preset.activeSetting = false
          }

          return preset
        })
      })

      this.setSettingsFromActivePreset()

      toast.success('Active preset changed')
    } catch (error) {
      console.error(error)
    }
  }

  async handleUnsetAllPresets() {
    try {
      const activePreset = this.getActivePreset()

      if (activePreset) {
        await UserModel.patchPresetSettings(activePreset?._id, { activeSetting: false })

        runInAction(() => {
          this.presetsTableData = this.presetsTableData.map(preset => {
            preset.activeSetting = false

            return preset
          })
        })

        toast.success('Active preset changed')
      }

      this.setSettingsFromActivePreset()
    } catch (error) {
      console.error(error)
    }
  }
}
