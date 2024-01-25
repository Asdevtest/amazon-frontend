/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { GridColDef } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { GeneralModel } from '@models/general-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { observerConfig } from './observer-config'

export class DataGridFilterTableModel extends DataGridTableModel {
  _filtersFields: string[]
  get filtersFields() {
    return this._filtersFields
  }
  set filtersFields(filtersFields: string[]) {
    this._filtersFields = filtersFields
  }

  _mainMethodURL: string
  get mainMethodURL() {
    return this._mainMethodURL
  }
  set mainMethodURL(mainMethodURL: string) {
    this._mainMethodURL = mainMethodURL
  }

  _fieldsForSearch: string[] = []
  get fieldsForSearch() {
    return this._fieldsForSearch
  }
  set fieldsForSearch(fieldsForSearch: string[]) {
    this._fieldsForSearch = fieldsForSearch
  }

  _columnMenuSettings = undefined
  get columnMenuSettings() {
    return this._columnMenuSettings
  }
  set columnMenuSettings(columnMenuSettings: any) {
    this._columnMenuSettings = columnMenuSettings
  }

  get isSomeFilterOn() {
    return this.filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData?.length)
  }

  _currentSearchValue = ''
  get currentSearchValue() {
    return this._currentSearchValue
  }
  set currentSearchValue(currentSearchValue: string) {
    this._currentSearchValue = currentSearchValue
  }

  _additionalPropertiesColumnMenuSettings: any = {}
  get additionalPropertiesColumnMenuSettings() {
    return this._additionalPropertiesColumnMenuSettings
  }
  set additionalPropertiesColumnMenuSettings(additionalProperties: any) {
    this._additionalPropertiesColumnMenuSettings = additionalProperties
  }

  _additionalPropertiesGetFilters: any = {}
  get additionalPropertiesGetFilters() {
    return this._additionalPropertiesGetFilters
  }
  set additionalPropertiesGetFilters(additionalProperties: any) {
    this._additionalPropertiesGetFilters = additionalProperties
  }

  constructor(
    getMainDataMethod: (...args: any) => any,
    columnsModel: GridColDef[],
    filtersFields: string[],
    mainMethodURL: string,
    fieldsForSearch?: string[],
    tableKey?: string,
    defaultGetDataMethodOptions?: any,
    additionalPropertiesColumnMenuSettings?: any,
    additionalPropertiesGetFilters?: any,
  ) {
    super(getMainDataMethod, columnsModel, tableKey, defaultGetDataMethodOptions)

    this.setColumnMenuSettings(filtersFields, additionalPropertiesColumnMenuSettings)
    this._filtersFields = filtersFields
    this._mainMethodURL = mainMethodURL
    this._additionalPropertiesColumnMenuSettings = additionalPropertiesColumnMenuSettings
    this._additionalPropertiesGetFilters = additionalPropertiesGetFilters

    if (fieldsForSearch) {
      this._fieldsForSearch = fieldsForSearch
    }

    makeObservable(this, observerConfig)
  }

  setColumnMenuSettings(filtersFields: string[], additionalProperties?: any) {
    this.columnMenuSettings = {
      onClickFilterBtn: (field: string, table: string) => this.onClickFilterBtn(field, table),
      onChangeFullFieldMenuItem: (value: any, field: string) => this.onChangeFullFieldMenuItem(value, field),
      onClickAccept: () => this.getMainTableData(),

      filterRequestStatus: loadingStatuses.SUCCESS,

      ...additionalProperties,

      ...dataGridFiltersInitializer(filtersFields),
    }
  }

  async onClickFilterBtn(column: string, table: string) {
    try {
      this.setFilterRequestStatus(loadingStatuses.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        table,
        column,
        // "?" не нужен, т.к. он должен быть в mainMethodURL, на случай если url должна содержать больше свойств
        `${this.mainMethodURL}filters=${this.getFilters(column)}`,
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

      this.setFilterRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.FAILED)
      console.log(error)
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
        this.additionalPropertiesGetFilters,
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
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await this.getMainDataMethod(
        options || {
          filters: this.getFilters(),

          limit: this.paginationModel.pageSize,
          offset: this.paginationModel.page * this.paginationModel.pageSize,

          sortField: this.sortModel.length ? this.sortModel?.[0]?.field : 'updatedAt',
          sortType: this.sortModel.length ? this.sortModel?.[0]?.sort?.toUpperCase() : 'DESC',

          ...this.defaultGetDataMethodOptions,
        },
      )

      runInAction(() => {
        this.tableData = result?.rows || result
        this.rowCount = result?.count || result.length
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.tableData = []
      this.rowCount = 0
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  setFilterRequestStatus(requestStatus: loadingStatuses) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }
}
