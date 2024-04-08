/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { GridColDef } from '@mui/x-data-grid'
import { GridPinnedColumns } from '@mui/x-data-grid-premium'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { GeneralModel } from '@models/general-model'
import { TableSettingsModel } from '@models/table-settings'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

import { IPinnedRows } from './data-grid-filter-table-model.type'
import { pinnedRowsInitialValue } from './filter-table-model'
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

  _additionalPropertiesGetFilters: any = undefined
  get additionalPropertiesGetFilters() {
    return this._additionalPropertiesGetFilters
  }
  set additionalPropertiesGetFilters(additionalProperties: any) {
    this._additionalPropertiesGetFilters = additionalProperties
  }

  _pinnedRows: IPinnedRows = pinnedRowsInitialValue
  get pinnedRows() {
    return this._pinnedRows
  }
  set pinnedRows(pinnedRows: IPinnedRows) {
    this._pinnedRows = pinnedRows
  }

  _isSaveBaseData = false
  _baseTableData: any[] = []
  get baseTableData() {
    return this._baseTableData
  }
  set baseTableData(baseTableData: any[]) {
    this._baseTableData = baseTableData
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
    dataModefierMethod,
    saveBaseData,
  }: {
    getMainDataMethod: (...args: any) => any
    columnsModel: GridColDef[]
    filtersFields: string[]
    mainMethodURL: string
    fieldsForSearch?: string[]
    tableKey?: string
    defaultGetDataMethodOptions?: any
    additionalPropertiesColumnMenuSettings?: any
    additionalPropertiesGetFilters?: any
    dataModefierMethod?: (...args: any) => any
    saveBaseData?: boolean
  }) {
    super({ getMainDataMethod, columnsModel, tableKey, defaultGetDataMethodOptions, dataModefierMethod })

    this.setColumnMenuSettings(filtersFields, additionalPropertiesColumnMenuSettings)

    this.columnMenuSettings.pinnedColumns = {
      left: [],
      right: [],
    }

    this._filtersFields = filtersFields
    this._mainMethodURL = mainMethodURL
    this._additionalPropertiesColumnMenuSettings = additionalPropertiesColumnMenuSettings
    this._additionalPropertiesGetFilters = additionalPropertiesGetFilters

    if (fieldsForSearch) {
      this._fieldsForSearch = fieldsForSearch
    }

    if (saveBaseData) {
      this._isSaveBaseData = saveBaseData
    }

    makeObservable(this, observerConfig)
  }

  setColumnMenuSettings(filtersFields: string[], additionalProperties?: any) {
    this.columnMenuSettings = {
      onClickFilterBtn: (field: string, table: string) => this.onClickFilterBtn(field, table),
      onChangeFullFieldMenuItem: (value: any, field: string) => this.onChangeFullFieldMenuItem(value, field),
      onClickAccept: () => this.getMainTableData(),
      onClickPinButton: (pinnedColumns: GridPinnedColumns) => this.handlePinColumn(pinnedColumns),

      // pinnedColumns: {
      //   left: [],
      //   right: [],
      // },
      filterRequestStatus: loadingStatus.SUCCESS,

      ...additionalProperties,

      ...dataGridFiltersInitializer(filtersFields),
    }
  }

  handlePinRow(pinnedRows: IPinnedRows) {
    this.pinnedRows = pinnedRows
  }

  handlePinColumn(pinnedColumns: GridPinnedColumns) {
    this.columnMenuSettings.pinnedColumns = pinnedColumns
    this.setDataGridState()
  }

  async onClickFilterBtn(column: string, table: string) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

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

          sortField: this.sortModel.length ? this.sortModel?.[0]?.field : 'updatedAt',
          sortType: this.sortModel.length ? this.sortModel?.[0]?.sort?.toUpperCase() : 'DESC',

          ...this.defaultGetDataMethodOptions?.(),
        },
      )

      if (this.dataModefierMethod) {
        result.rows = this.dataModefierMethod(result.rows)
      }

      runInAction(() => {
        this.tableData = result?.rows || result

        if (this._isSaveBaseData) {
          this.baseTableData = result?.rows || result
        }

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
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  setDataGridState() {
    if (!this._tableKey) return

    const requestState = {
      sortModel: this.sortModel,
      filterModel: this.filterModel,
      paginationModel: this.paginationModel,
      columnVisibilityModel: this.columnVisibilityModel,
      pinnedColumns: this.columnMenuSettings?.pinnedColumns,
    }

    TableSettingsModel.saveTableSettings(requestState, this._tableKey)
  }

  getDataGridState() {
    if (!this._tableKey) return

    // @ts-ignore
    const state = TableSettingsModel.getTableSettings(this._tableKey)

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
      this.columnMenuSettings.pinnedColumns = state?.pinnedColumns
    }
  }
}
