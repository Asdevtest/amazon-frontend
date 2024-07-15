/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import {
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-premium'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { GeneralModel } from '@models/general-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

import { DataGridFilterTableModelParams } from './data-grid-filter-table-model.type'
import { observerConfig } from './observer-config'

export class DataGridFilterTableModel extends DataGridTableModel {
  filtersFields: string[]

  mainMethodURL: string

  columnMenuSettings: any = undefined

  additionalPropertiesColumnMenuSettings: any = {}

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
  }: DataGridFilterTableModelParams) {
    super({
      getMainDataMethod,
      columnsModel,
      tableKey,
      defaultGetCurrentDataOptions,
      fieldsForSearch,
      defaultSortModel,
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
      onClickFilterBtn: (field: string, table: string, searchValue?: string) =>
        this.onClickFilterBtn(field, table, searchValue),
      onChangeFullFieldMenuItem: (value: any, field: string) => this.onChangeFullFieldMenuItem(value, field),
      onClickAccept: () => this.getCurrentData(),

      filterRequestStatus: loadingStatus.SUCCESS,

      ...additionalProperties,

      ...dataGridFiltersInitializer(filtersFields),
    }
  }

  async onClickFilterBtn(column: string, table: string, searchValue?: string) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        table,
        column,
        // "?" не нужен, т.к. он должен быть в mainMethodURL, на случай если url должна содержать больше свойств
        `${this.mainMethodURL}filters=${this.getFilters(column)}${searchValue || ''}`,
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

  onSearchSubmit(value: string) {
    this.currentSearchValue = value
    this.getCurrentData()
  }

  onChangeFullFieldMenuItem(value: any, field: string) {
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

  onColumnVisibilityModelChange(model: GridColumnVisibilityModel) {
    this.columnVisibilityModel = model
    this.getCurrentData()
    this.setDataGridState()
  }

  onChangeSortingModel(sortModel: GridSortModel) {
    this.sortModel = sortModel
    this.getCurrentData()
    this.setDataGridState()
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
}
