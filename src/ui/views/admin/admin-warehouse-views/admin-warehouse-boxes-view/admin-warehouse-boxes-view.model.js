import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { BoxesModel } from '@models/boxes-model'
import { GeneralModel } from '@models/general-model'
import { TableSettingsModel } from '@models/table-settings'

import { adminBoxesViewColumns } from '@components/table/table-columns/admin/boxes-columns'

import { adminBoxesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

import { filtersFields } from './admin-warehouse-boxes-view.constants'

export class AdminWarehouseBoxesViewModel {
  requestStatus = undefined

  nameSearchValue = ''
  curBox = undefined
  boxes = []
  selectedBoxes = []

  showBoxViewModal = false

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  columnsModel = adminBoxesViewColumns()

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.getDataGridState()
      this.getBoxes()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  get currentData() {
    return this.boxes
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getBoxes()
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getBoxes()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getBoxes()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  onSelectionModel(model) {
    const boxes = this.boxesMy.filter(box => model.includes(box.id))

    this.selectedBoxes = boxes.reduce((ac, el) => ac.concat(el._id), [])
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_BOXES)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.ADMIN_BOXES)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getBoxes()
    } catch (error) {
      console.error(error)
    }
  }

  async getBoxes() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const { rows, count } = await BoxesModel.getBoxes({
        filters: this.getFilters(),
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.boxes = adminBoxesDataConverter(rows)
        this.rowCount = count
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      const response = await BoxesModel.getBoxById(row._id)

      runInAction(() => {
        this.curBox = response
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  // * Filtration

  getFilters(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'asin',
        'skuByClient',
        'amazonTitle',
      ]),
    )
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
    this.getBoxes()
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getDataGridState()
    this.getBoxes()
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const filterData = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'boxes'),
        column,
        `boxes?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData },
          }
        })
      }

      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }
}
