/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { GridPinnedColumns } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { DefaultModel } from '@models/default-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { ITablePreset } from '@typings/models/user/table-preset'
import { IGridColumn } from '@typings/shared/grid-column'

import { DataGridTableModelParams } from './data-grid-table-model.type'
import { defaultPinnedColumns, filterModelInitialValue, paginationModelInitialValue } from './model-config'
import { observerConfig } from './observer-config'

export class DataGridTableModel extends DefaultModel {
  currentSearchValue: string = ''
  densityModel = 'compact'

  sortModel: GridSortModel | undefined = undefined
  defaultSortModel: GridSortModel | undefined = undefined

  paginationModel: GridPaginationModel = paginationModelInitialValue
  filterModel: GridFilterModel = filterModelInitialValue
  columnVisibilityModel: GridColumnVisibilityModel = {}

  selectedRows: string[] = []
  tableKey: string = ''
  columnsModel: IGridColumn[] = []
  defaultColumnsModel: IGridColumn[] = []

  fieldsForSearch: string[] = []

  showPresetsSelect = false
  presetsTableData: ITablePreset[] = []
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
    defaultSortModel,
  }: DataGridTableModelParams) {
    super({ getMainDataMethod, defaultGetCurrentDataOptions })

    if (fieldsForSearch) {
      this.fieldsForSearch = fieldsForSearch
    }

    if (defaultSortModel) {
      this.defaultSortModel = defaultSortModel
    }

    this.columnsModel = columnsModel
    this.defaultColumnsModel = columnsModel

    if (tableKey) {
      this.tableKey = tableKey
    }

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

  async handleSetPresetActive(presetId: string) {
    if (presetId) {
      this.handleSetActivePreset(presetId)
    } else {
      this.handleUnsetAllPresets()
    }

    // this.onChangeShowPresetsSelect(false)
  }

  async handleCreateTableSettingsPreset(title: string, colomns: IGridColumn[]) {
    try {
      const settings = this.getPresetSettingForSave(colomns)

      const presetToCreate: any = {
        settings,
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

      toast.success(t(TranslationKey['Preset created']))
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
    } catch (error) {
      console.error(error)
    }

    this.setSettingsFromActivePreset()
  }

  async handleDeleteTableSettingsPreset(preset: ITablePreset) {
    try {
      await UserModel.deleteUsersPresetsByGuid(preset?._id)

      runInAction(() => {
        this.presetsTableData = this.presetsTableData.filter(currentPreset => preset._id !== currentPreset?._id)
      })

      if (preset?.activeSetting) {
        await this.setSettingsFromActivePreset()
      }

      toast.success(t(TranslationKey['Preset deleted']))
    } catch (error) {
      console.error(error)
    }
  }

  async handleUpdateTableSettingsPreset(presetId: string, colomns: IGridColumn[]) {
    try {
      const settings = this.getPresetSettingForSave(colomns)

      await UserModel.patchPresetSettings(presetId, { settings })

      runInAction(() => {
        for (const preset of this.presetsTableData) {
          if (preset._id === presetId) {
            preset.settings = settings
          }
        }
      })

      toast.success(t(TranslationKey['Preset updated']))
    } catch (error) {
      console.error(error)
    }
  }

  async setSettingsFromActivePreset() {
    const activePreset = this.getActivePreset()

    if (activePreset) {
      // @ts-ignore
      const savedColumns = []

      for await (const field of activePreset.settings.fields) {
        const foundColumn = this.columnsModel?.find(column => column?.field === field?.field)

        if (foundColumn) {
          foundColumn.width = field?.width
        } else {
          continue
        }

        savedColumns.push(foundColumn)
      }

      this.columnsModel = await savedColumns

      this.sortModel = activePreset?.settings?.sortModel
      this.pinnedColumns = activePreset?.settings?.pinnedColumns
      this.paginationModel = activePreset?.settings?.paginationModel
      this.columnVisibilityModel = activePreset?.settings?.columnVisibilityModel
    } else {
      this.handlePinColumn(defaultPinnedColumns)

      // Doesnt work with await and map methods
      this.columnsModel = await this.defaultColumnsModel?.map(column => ({
        ...column,
      }))

      this.sortModel = this.defaultSortModel
      this.paginationModel = paginationModelInitialValue
      this.columnVisibilityModel = {}
    }

    this.getCurrentData()
  }

  getActivePreset() {
    return this.presetsTableData?.find(preset => preset?.activeSetting) as ITablePreset
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

      toast.success(t(TranslationKey['Active preset changed']))
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

        toast.success(t(TranslationKey['Active preset changed']))
      }

      this.setSettingsFromActivePreset()
    } catch (error) {
      console.error(error)
    }
  }

  getPresetSettingForSave(colomns: IGridColumn[]) {
    const fields = colomns?.map(column => ({
      field: column.field,
      width: column.width,
    }))

    return {
      sortModel: this?.sortModel,
      paginationModel: this?.paginationModel,
      pinnedColumns: this?.pinnedColumns,
      columnVisibilityModel: this?.columnVisibilityModel,
      fields,
    }
  }

  async onClickAddQuickAccess(selectedPreset: ITablePreset) {
    try {
      const newFavoriteState = !selectedPreset?.isFavorite

      await UserModel.patchPresetSettings(selectedPreset?._id, { isFavorite: newFavoriteState })

      runInAction(() => {
        this.presetsTableData = this.presetsTableData.map(preset => {
          if (preset._id === selectedPreset?._id) {
            preset.isFavorite = newFavoriteState
          }

          return preset
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  onChangeShowPresetsSelect(value: boolean) {
    if (value !== undefined) {
      this.onTriggerOpenModal('showPresetsSelect', value)
    }
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
        return obj[key].some((item: any) => this.checkNestedFields(item, searchValue, fieldsForSearch))
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        return this.checkNestedFields(obj[key], searchValue, fieldsForSearch)
      }
      return false
    })
  }
}
