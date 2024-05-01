/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { GeneralModel } from '@models/general-model'

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
}
