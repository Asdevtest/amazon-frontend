/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid-premium'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { defaultPinnedColumns, paginationModelInitialValue } from '@models/data-grid-table-model/model-config'
import { GeneralModel } from '@models/general-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'
import { IGridColumn } from '@typings/shared/grid-column'

import { DataGridFilterTableModelParams } from './data-grid-filter-table-model.type'
import { observerConfig } from './observer-config'

export class DataGridFilterTableModel extends DataGridTableModel {
  filtersFields: string[]
  mainMethodURL: string
  columnMenuSettings: any = undefined
  additionalPropertiesColumnMenuSettings: any = undefined
  additionalPropertiesGetFilters: any = undefined
  defaultFilterParams: any = undefined
  operatorsSettings: any = undefined

  get isSomeFilterOn() {
    return this.filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData?.length)
  }

  constructor({
    getMainDataMethod,
    columnsModel,
    filtersFields,
    mainMethodURL,
    fieldsForSearch,
    tableKey,
    defaultGetCurrentDataOptions,
    additionalPropertiesColumnMenuSettings,
    additionalPropertiesGetFilters,
    operatorsSettings,
    defaultFilterParams,
    defaultSortModel,
    defaultColumnVisibilityModel,
  }: DataGridFilterTableModelParams) {
    super({
      getMainDataMethod,
      columnsModel,
      tableKey,
      defaultGetCurrentDataOptions,
      fieldsForSearch,
      defaultSortModel,
      defaultColumnVisibilityModel,
    })

    this.setColumnMenuSettings(filtersFields, additionalPropertiesColumnMenuSettings)
    this.filtersFields = filtersFields
    this.mainMethodURL = mainMethodURL
    this.additionalPropertiesColumnMenuSettings = additionalPropertiesColumnMenuSettings
    this.additionalPropertiesGetFilters = additionalPropertiesGetFilters
    this.operatorsSettings = operatorsSettings
    this.defaultFilterParams = defaultFilterParams

    makeObservable(this, observerConfig)
  }

  setColumnMenuSettings(filtersFields: string[], additionalProperties?: any) {
    this.columnMenuSettings = {
      onClickFilterBtn: (field: string, table: string, searchValue?: string, fieldNameFilter?: string) =>
        this.onClickFilterBtn(field, table, searchValue, fieldNameFilter),
      onChangeFullFieldMenuItem: (value: any, field: string) => this.onChangeFullFieldMenuItem(value, field),
      onClickAccept: () => this.getCurrentData(),

      filterRequestStatus: loadingStatus.SUCCESS,

      ...additionalProperties,

      ...dataGridFiltersInitializer(filtersFields),
    }
  }

  async onClickFilterBtn(
    column: string,
    table: string,
    additionalFilterSettings: string = '',
    fieldNameFilter?: string,
  ) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        table,
        fieldNameFilter || column,
        // "?" не нужен, т.к. он должен быть в mainMethodURL, на случай если url должна содержать больше свойств
        `${this.mainMethodURL}filters=${this.getFilters(fieldNameFilter || column)}${additionalFilterSettings}`,
      )

      if (this.columnMenuSettings[column as keyof typeof this.columnMenuSettings]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            // Не меняет состояние колонки напрямую, а деструктуризируем, чтобы изменилась ссылка и корректно перерисовался компонент
            // @ts-ignore
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  getFilters(exclusion?: string) {
    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.currentSearchValue,
        exclusion,
        this.filtersFields,
        this.fieldsForSearch,
        this.additionalPropertiesGetFilters?.(),
        this.operatorsSettings,
        this.defaultFilterParams?.(),
      ),
    )
  }

  onSearchSubmit(
    value: string,
    _event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    info?: {
      source?: 'clear' | 'input'
    },
  ) {
    const wasFilterApplied = this.getFilters().includes(this.fieldsForSearch?.[0]) // stores information about the previous filter (when there was a value and it was cleared)

    this.currentSearchValue = value.trim() // remove spaces

    if (!this.currentSearchValue && info?.source !== 'clear') {
      // request with an empty value
      this.getCurrentData()
      return
    }

    const isFilterApplied = this.getFilters().includes(this.fieldsForSearch?.[0]) // stores information about the current filter (when there is a value)

    if (wasFilterApplied || isFilterApplied) {
      // the re-request is triggered only if the value exists, or it was before clearing, otherwise the two conditions are 'false' (the case when we entered a value and it was deleted - without a request)
      this.getCurrentData()
    }
  }

  onChangeFullFieldMenuItem(value: any, field: string) {
    if (!this.columnMenuSettings[field]) {
      return
    }

    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickResetFilters() {
    this.setColumnMenuSettings(this.filtersFields, this.additionalPropertiesColumnMenuSettings)
    this.getCurrentData()
  }

  async getCurrentData(options?: any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await this.getMainDataMethod(
        options || {
          filters: this.getFilters(),

          limit: this.paginationModel.pageSize,
          offset: this.paginationModel.page * this.paginationModel.pageSize,

          sortField: this.sortModel?.length ? this.sortModel?.[0]?.field : 'updatedAt',
          sortType: this.sortModel?.length ? this.sortModel?.[0]?.sort?.toUpperCase() : 'DESC',

          ...this.defaultGetCurrentDataOptions?.(),
        },
      )

      runInAction(() => {
        this.currentData = result?.rows || result || []
        this.rowCount = result?.count || result.length || []
        this.meta = result?.meta
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)

      runInAction(() => {
        this.currentData = []
        this.rowCount = 0
        this.meta = null
      })
    }
  }

  setFilterRequestStatus(requestStatus: loadingStatus) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      filterRequestStatus: requestStatus,
    }
  }

  onChangeSortingModel(sortModel: GridSortModel) {
    if (sortModel.length > 0) {
      this.sortModel = sortModel
      this.getCurrentData()
      this.setDataGridState()
    }
  }

  onChangeFilterModel(model: GridFilterModel) {
    this.filterModel = model
    this.getCurrentData()
    this.setDataGridState()
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this.paginationModel = model
    this.getCurrentData()
    this.setDataGridState()
  }

  getPresetSettingForSave(colomns: IGridColumn[]) {
    const filters = this.getFilters()

    const fields = colomns?.map(column => ({
      field: column.field,
      width: column.width,
    }))

    return {
      sortModel: this?.sortModel,
      paginationModel: this?.paginationModel,
      pinnedColumns: this?.pinnedColumns,
      columnVisibilityModel: this?.columnVisibilityModel,
      filters,
      fields,
    }
  }

  async setSettingsFromActivePreset() {
    const activePreset = this.getActivePreset()

    if (activePreset) {
      const savedColumns: IGridColumn[] = []
      const defaultColumnsModel = [...this.defaultColumnsModel]
      const visibilityModel = activePreset?.settings?.columnVisibilityModel
      for (const field of activePreset.settings.fields) {
        const foundColumnIndex = defaultColumnsModel?.findIndex(column => column?.field === field?.field)
        const foundColumn = defaultColumnsModel?.[foundColumnIndex]

        if (foundColumn) {
          foundColumn.width = field?.width
        } else {
          continue
        }

        savedColumns.push(foundColumn)
        defaultColumnsModel.splice(foundColumnIndex, 1)
      }

      if (defaultColumnsModel.length > 0) {
        savedColumns?.push(...defaultColumnsModel)

        for (const column of defaultColumnsModel) {
          visibilityModel[column.field] = false
        }
      }

      const parsedValue = this.parseQueryString(activePreset?.settings?.filters)
      this.setFilterFromPreset(parsedValue)

      runInAction(() => {
        this.columnsModel = savedColumns
        this.sortModel = activePreset?.settings?.sortModel
        this.pinnedColumns = activePreset?.settings?.pinnedColumns
        this.paginationModel = activePreset?.settings?.paginationModel
        this.columnVisibilityModel = visibilityModel
      })
    } else {
      this.handlePinColumn(defaultPinnedColumns)

      const savedColumns: IGridColumn[] = await this.defaultColumnsModel?.map(column => ({
        ...column,
      }))

      this.currentSearchValue = ''
      this.setColumnMenuSettings(this.filtersFields, this.additionalPropertiesColumnMenuSettings)

      runInAction(() => {
        this.columnsModel = savedColumns
        this.sortModel = this.defaultSortModel
        this.paginationModel = paginationModelInitialValue
        this.columnVisibilityModel = this.defaultColumnVisibilityModel || {}
      })
    }

    this.getCurrentData()
  }

  parseQueryString(queryString?: string): Record<string, string | string[]> {
    if (!queryString) {
      return {}
    }

    const params = queryString.split(';')
    const result: Record<string, string | string[]> = {}

    params.forEach(param => {
      const [key, value] = param.split('=')

      if (key?.includes('or') && !result.currentSearchValue) {
        result.currentSearchValue = value
      } else {
        const decodedKey = decodeURIComponent(key).replace(/\[.*?\]/, '')
        const decodedValue = decodeURIComponent(value)

        let valueArray: string[] = []

        if (decodedValue) {
          valueArray = decodedValue.split(',').map(item => item.replace(/"/g, ''))
        }

        result[decodedKey] = valueArray
      }
    })

    return result
  }

  setFilterFromPreset(presetFilters: Record<string, string | string[]>) {
    const keys = Object.keys(presetFilters)

    if (!presetFilters?.currentSearchValue) {
      this.currentSearchValue = ''
    } else {
      this.currentSearchValue = presetFilters.currentSearchValue as string
    }

    this.setColumnMenuSettings(this.filtersFields, this.additionalPropertiesColumnMenuSettings)

    for (const key of keys) {
      if (key === 'currentSearchValue') {
        continue
      } else {
        this.onChangeFullFieldMenuItem(presetFilters[key], key)
      }
    }
  }
}
