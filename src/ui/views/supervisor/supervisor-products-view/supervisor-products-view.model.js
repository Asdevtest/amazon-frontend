import { makeAutoObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { supervisorProductsViewColumns } from '@components/table/table-columns/supervisor/supervisor-products-columns'

import { supervisorProductsDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { filtersFields } from './supervisor-products-view.constants'

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined

  nameSearchValue = ''
  baseProducts = []
  productsMy = []
  switcherFilterStatuses = []

  productCardModal = false

  sortModel = []
  startFilterModel = undefined
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  rowCount = 0
  columnVisibilityModel = {}
  rowHandlers = {
    onClickShowProduct: id => this.onClickTableRow(id),
  }
  columnsModel = supervisorProductsViewColumns(this.rowHandlers)
  orderedYesNoFilterData = {
    yes: true,
    no: true,
    handleFilters: (yes, no) => this.onHandleOrderedFilter(yes, no),
  }
  onHandleOrderedFilter = (yes, no) => {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      orderedYesNoFilterData: {
        ...this.columnMenuSettings.orderedYesNoFilterData,
        yes,
        no,
      },
    }

    this.loadData()
  }
  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => this.loadData(),
    orderedYesNoFilterData: this.orderedYesNoFilterData,
    ...dataGridFiltersInitializer(filtersFields),
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get currentData() {
    return this.productsMy
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor({ history }) {
    this.history = history

    if (history.location?.state?.dataGridFilter) {
      this.startFilterModel = history.location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model
    this.setDataGridState()
    this.getProductsMy()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
    this.setDataGridState()
    this.getProductsMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
    this.getProductsMy()
  }

  setDataGridState() {
    const requestState = {
      sortModel: this.sortModel,
      filterModel: this.filterModel,
      paginationModel: this.paginationModel,
      columnVisibilityModel: this.columnVisibilityModel,
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SUPERVISOR_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_PRODUCTS]

    if (state) {
      this.sortModel = state.sortModel
      this.filterModel = this.startFilterModel
        ? {
            ...this.startFilterModel,
            items: this.startFilterModel.items.map(el => ({ ...el, value: el.value.map(e => t(e)) })),
          }
        : state.filterModel
      this.paginationModel = state.paginationModel
      this.columnVisibilityModel = state.columnVisibilityModel
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue
    this.getProductsMy()
  }

  onClickStatusFilterButton(statuses) {
    this.switcherFilterStatuses = statuses
    this.getProductsMy()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
    this.setDataGridState()
    this.getProductsMy()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getProductsMy()
    } catch (error) {
      console.error(error)
    }
  }

  async getProductsMy() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await SupervisorModel.getProductsMyPag({
        filters: this.getFilters(),
        statusGroup: this.currentStatusGroup,
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.productsMy = supervisorProductsDataConverter(result.rows)
        this.rowCount = result.count
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onClickTableRow(id) {
    const win = window.open(`${window.location.origin}/supervisor/products/product?product-id=${id}`, '_blank')
    win.focus()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  getFilters(exclusion) {
    const ordered =
      this.columnMenuSettings.orderedYesNoFilterData.yes && this.columnMenuSettings.orderedYesNoFilterData.no
        ? null
        : this.columnMenuSettings.orderedYesNoFilterData.yes

    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.nameSearchValue,
        exclusion,
        filtersFields,
        ['asin', 'amazonTitle', 'skuByClient'],
        {
          ...(this.switcherFilterStatuses.length > 0 && {
            status: { $eq: this.switcherFilterStatuses.join(',') },
          }),
          ...(ordered !== null && {
            ordered: { $eq: ordered },
          }),
        },
      ),
    )
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.loadData()
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,
        `supervisors/products/pag/my?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)

      console.error(error)
    }
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickProductModal(row) {
    if (row) {
      this.history.push(`/supervisor/products?product-id=${row.originalData._id}`)
    } else {
      this.history.push(`/supervisor/products`)
    }

    this.onTriggerOpenModal('productCardModal')
  }
}
