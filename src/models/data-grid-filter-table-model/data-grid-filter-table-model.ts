/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable, override, runInAction } from 'mobx'

import { GridColDef } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { GeneralModel } from '@models/general-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

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

  _columnMenuSettings = {}
  get columnMenuSettings() {
    return this._columnMenuSettings
  }
  set columnMenuSettings(columnMenuSettings: any) {
    this._columnMenuSettings = columnMenuSettings
  }

  get isSomeFilterOn() {
    return this._filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData?.length)
  }

  _currentSearchValue = ''
  get currentSearchValue() {
    return this._currentSearchValue
  }
  set currentSearchValue(currentSearchValue: string) {
    this._currentSearchValue = currentSearchValue
  }

  constructor(
    getMainDataMethod: (...args: any) => any,
    columnsModel: GridColDef[],
    filtersFields: string[],
    mainMethodURL: string,
    fieldsForSearch?: string[],
    history?: History,
    tableKey?: string,
  ) {
    super(getMainDataMethod, columnsModel, history, tableKey)

    this.setColumnMenuSettings(filtersFields)
    this._filtersFields = filtersFields
    this._mainMethodURL = mainMethodURL

    if (fieldsForSearch) {
      this._fieldsForSearch = fieldsForSearch
    }

    makeObservable(this, {
      _filtersFields: observable,
      _mainMethodURL: observable,
      _columnMenuSettings: observable,
      _currentSearchValue: observable,
      _fieldsForSearch: observable,

      filtersFields: computed,
      columnMenuSettings: computed,
      isSomeFilterOn: computed,
      currentSearchValue: computed,
      fieldsForSearch: computed,
      mainMethodURL: computed,

      setColumnMenuSettings: action.bound,
      getFilters: action.bound,
      onChangeSearchValue: action.bound,
      onChangeFullFieldMenuItem: action.bound,
      onClickFilterBtn: action.bound,
      onClickResetFilters: action.bound,

      getMainTableData: override,
    })
  }

  setColumnMenuSettings(filtersFields: string[]) {
    this.columnMenuSettings = {
      onClickFilterBtn: (field: string, table: string) => this.onClickFilterBtn(field, table),
      onChangeFullFieldMenuItem: (value: any, field: string) => this.onChangeFullFieldMenuItem(value, field),
      onClickAccept: () => this.getMainTableData(),
      filterRequestStatus: loadingStatuses.SUCCESS,

      ...dataGridFiltersInitializer(filtersFields),
    }
  }

  async onClickFilterBtn(column: string, table: string) {
    try {
      const data = await GeneralModel.getDataForColumn(
        table,
        column,
        `${this._mainMethodURL}?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column as keyof typeof this.columnMenuSettings]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            // @ts-ignore
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  getFilters(exclusion?: string) {
    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.currentSearchValue,
        exclusion,
        this._filtersFields,
        this._fieldsForSearch,
      ),
    )
  }

  onChangeSearchValue(value: string) {
    this.currentSearchValue = value
    this.getMainTableData()
  }

  onChangeFullFieldMenuItem(value: any, field: string) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      [field]: {
        // @ts-ignore
        ...this.columnMenuSettings[field],
        currentFilterData: value,
      },
    }
  }

  onClickResetFilters() {
    this.setColumnMenuSettings(this._filtersFields)
    this.getMainTableData()
  }

  async getMainTableData(options?: any) {
    try {
      this.requestStatus = loadingStatuses.IS_LOADING

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
        this.rowCount = result?.count
      })

      this.requestStatus = loadingStatuses.SUCCESS

      return result
    } catch (error) {
      console.log(error)
      this.requestStatus = loadingStatuses.FAILED
    }
  }
}
