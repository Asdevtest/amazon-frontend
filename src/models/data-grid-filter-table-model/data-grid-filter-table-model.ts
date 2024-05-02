/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { GridPinnedColumns } from '@mui/x-data-grid-premium'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { GeneralModel } from '@models/general-model'
import { TableSettingsModel } from '@models/table-settings'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

import { DataGridFilterTableModelParams } from './data-grid-filter-table-model.type'
import { observerConfig } from './observer-config'

export class DataGridFilterTableModel extends DataGridTableModel {
  currentSearchValue: string = ''

  filtersFields: string[]

  mainMethodURL: string

  fieldsForSearch: string[] = []

  columnMenuSettings: any = undefined

  get isSomeFilterOn() {
    return this.filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData?.length)
  }

  additionalPropertiesColumnMenuSettings: any = {}

  additionalPropertiesGetFilters: any = undefined

  pinnedColumns: GridPinnedColumns = {
    left: [],
    right: [],
  }

  constructor({
    getMainDataMethod,
    columnsModel,
    filtersFields,
    mainMethodURL,
    fieldsForSearch,
    tableKey,
    defaultGetDataMethodOptions,
    additionalPropertiesColumnMenuSettings,
    additionalPropertiesGetFilters,
  }: DataGridFilterTableModelParams) {
    super({
      getMainDataMethod,
      columnsModel,
      tableKey,
      defaultGetDataMethodOptions,
    })

    this.setColumnMenuSettings(filtersFields, additionalPropertiesColumnMenuSettings)
    this.filtersFields = filtersFields
    this.mainMethodURL = mainMethodURL
    this.additionalPropertiesColumnMenuSettings = additionalPropertiesColumnMenuSettings
    this.additionalPropertiesGetFilters = additionalPropertiesGetFilters

    if (fieldsForSearch) {
      this.fieldsForSearch = fieldsForSearch
    }

    makeObservable(this, observerConfig)
  }

  setColumnMenuSettings(filtersFields: string[], additionalProperties?: any) {
    this.columnMenuSettings = {
      onClickFilterBtn: (field: string, table: string, searchValue?: string) =>
        this.onClickFilterBtn(field, table, searchValue),
      onChangeFullFieldMenuItem: (value: any, field: string) => this.onChangeFullFieldMenuItem(value, field),
      onClickAccept: () => this.getMainTableData(),

      filterRequestStatus: loadingStatus.SUCCESS,

      ...additionalProperties,

      ...dataGridFiltersInitializer(filtersFields),
    }
  }

  handlePinColumn(pinnedColumns: GridPinnedColumns) {
    this.pinnedColumns = pinnedColumns
    this.setDataGridState()
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
      ),
    )
  }

  onSearchSubmit(value: string) {
    this.currentSearchValue = value
    this.getMainTableData()
  }

  onChangeFullFieldMenuItem(value: any, field: string) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickResetFilters() {
    this.setColumnMenuSettings(this.filtersFields, this.additionalPropertiesColumnMenuSettings)
    this.getMainTableData()
  }

  async getMainTableData(options?: any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await this.getMainDataMethod(
        options || {
          filters: this.getFilters(),

          limit: this.paginationModel.pageSize,
          offset: this.paginationModel.page * this.paginationModel.pageSize,

          sortField: this.sortModel?.length ? this.sortModel?.[0]?.field : 'updatedAt',
          sortType: this.sortModel?.length ? this.sortModel?.[0]?.sort?.toUpperCase() : 'DESC',

          ...this.defaultGetDataMethodOptions?.(),
        },
      )

      runInAction(() => {
        this.tableData = result?.rows || result

        this.rowCount = result?.count || result.length
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.tableData = []
      this.rowCount = 0
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  setFilterRequestStatus(requestStatus: loadingStatus) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      filterRequestStatus: requestStatus,
    }
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
}
