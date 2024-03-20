import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { BoxesModel } from '@models/boxes-model'
import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { adminBoxesViewColumns } from '@components/table/table-columns/admin/boxes-columns'

import { adminBoxesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

import { filtersFields } from './admin-warehouse-boxes-view.constants'

export class AdminWarehouseBoxesViewModel {
  requestStatus = undefined

  nameSearchValue = ''
  curBox = undefined
  volumeWeightCoefficient = undefined
  boxes = []
  selectedBoxes = []

  get currentData() {
    return this.boxes
  }

  showBoxViewModal = false

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_BOXES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_BOXES]

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
      console.log(error)
    }
  }

  async getBoxes() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const { rows, count } = await BoxesModel.getBoxes({
        filters: this.getFilters(),
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.boxes = adminBoxesDataConverter(rows).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
        this.rowCount = count
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)

      runInAction(() => {
        this.boxes = []
        this.rowCount = 0
      })
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const box = await BoxesModel.getBoxById(row._id)
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.curBox = box
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showBoxViewModal')

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
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

    this.getBoxes()
    this.getDataGridState()
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'boxes'),
        column,
        `boxes?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
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

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }
}
