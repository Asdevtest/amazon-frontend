/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, flow, makeObservable, observable, runInAction } from 'mobx'

import { GridColDef } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { GeneralModel } from '@models/general-model'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

import { IListOfModals } from '@typings/data-grid'

export class DataGridFilterTableModel extends DataGridTableModel {
  _filtersFields: string[]
  _mainMethodURL: string
  _fieldsForSearch: string[] = []

  _columnMenuSettings = {}
  get columnMenuSettings() {
    return this._columnMenuSettings
  }

  _currentSearchValue = ''

  constructor(
    getMainDataMethod: (...args: any) => any,
    columnsModel: GridColDef[],
    filtersFields: string[],
    mainMethodURL: string,
    fieldsForSearch?: string[],
    history?: History,
    listOfModals?: IListOfModals,
    tableKey?: string,
  ) {
    super(getMainDataMethod, columnsModel, history, listOfModals, tableKey)

    this.setColumnMenuSettings(filtersFields)
    this._filtersFields = filtersFields
    this._mainMethodURL = mainMethodURL

    if (fieldsForSearch) this._fieldsForSearch = fieldsForSearch

    makeObservable(this, {
      _filtersFields: observable,
      _mainMethodURL: observable,
      _columnMenuSettings: observable,
      _currentSearchValue: observable,
      _fieldsForSearch: observable,

      columnMenuSettings: computed,

      setColumnMenuSettings: action,
      getFilters: action,
      onChangeSearchValue: action,
      onChangeFullFieldMenuItem: action,

      onClickFilterBtn: flow,
    })
  }

  setColumnMenuSettings(filtersFields: string[]) {
    this._columnMenuSettings = {
      onClickFilterBtn: (field: string) => this.onClickFilterBtn(field),
      onChangeFullFieldMenuItem: (value: any, field: string) => this.onChangeFullFieldMenuItem(value, field),
      onClickAccept: () => {
        this.getMainTableData()
      },

      filterRequestStatus: loadingStatuses.success,

      ...dataGridFiltersInitializer(filtersFields),
    }
  }

  async onClickFilterBtn(column: string, hint?: string) {
    try {
      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, hint),
        column,
        `${this._mainMethodURL}?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column as keyof typeof this.columnMenuSettings]) {
        runInAction(() => {
          this._columnMenuSettings = {
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

  getFilters(exclusion: string) {
    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this._currentSearchValue,
        exclusion,
        this._filtersFields,
        this._fieldsForSearch,
      ),
    )
  }

  onChangeSearchValue(value: string) {
    this._currentSearchValue = value
    this.getMainTableData()
  }

  onChangeFullFieldMenuItem(value: any, field: string) {
    this._columnMenuSettings = {
      ...this.columnMenuSettings,
      [field]: {
        // @ts-ignore
        ...this.columnMenuSettings[field],
        currentFilterData: value,
      },
    }
  }
}
