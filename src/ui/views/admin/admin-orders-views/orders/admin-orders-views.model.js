import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { ActiveSubCategoryTablesKeys } from '@constants/table/active-sub-category-tables-keys'
import {
  AdminOrdersStatusesCategories,
  adminOrdersStatusesByCategory,
} from '@constants/table/tables-filter-btns-configs'

import { AdministratorModel } from '@models/administrator-model'
import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'

import { adminOrdersViewColumns } from '@components/table/table-columns/admin/orders-columns'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

import { filtersFields } from './admin-orders-views.constants'

export class AdminOrdersAllViewModel {
  history = undefined
  requestStatus = undefined

  nameSearchValue = ''

  orderData = []
  currentOrdersData = []

  currentData = []

  rowSelectionModel = undefined

  activeSubCategory = AdminOrdersStatusesCategories.all

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminOrdersViewColumns()

  paginationModel = { page: 0, pageSize: 15 }
  rowsCount = 0
  columnVisibilityModel = {}

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getOrdersByStatus()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.currentOrdersData,
      () =>
        runInAction(() => {
          this.currentData = toJS(this.currentOrdersData)
        }),
    )
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getOrdersByStatus()
  }

  onChangePaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getOrdersByStatus()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  setActiveSubCategoryState(state) {
    SettingsModel.setActiveSubCategoryState(state, ActiveSubCategoryTablesKeys.ADMIN_ORDERS)
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_ORDERS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onClickTableRow(order) {
    const url = `/admin/orders/order?orderId=${order._id}`

    const newTab = window.open(`${url}`, '_blank')
    newTab.focus()
  }

  onChangeSubCategory(value) {
    this.setActiveSubCategoryState(value)

    this.activeSubCategory = value

    this.getOrdersByStatus()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getOrdersByStatus() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getDataGridState()

      const result = await AdministratorModel.getOrdersPag({
        status: adminOrdersStatusesByCategory[this.activeSubCategory].join(),

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        filters: this.getFilters(),
      })

      runInAction(() => {
        this.rowsCount = result.count
        this.currentOrdersData = result.rows
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)

      runInAction(() => {
        this.currentOrdersData = []
      })
    }
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getOrdersByStatus()
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
    this.getOrdersByStatus()
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getOrdersByStatus()
    this.getDataGridState()
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      filterRequestStatus: requestStatus,
    }
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)

      const filters = this.getFilters(column)
      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'orders'),
        column,

        `admins/orders/pag?filters=${filters}&status=${adminOrdersStatusesByCategory[this.activeSubCategory].join()}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      [field]: {
        ...this.columnMenuSettings[field],
        currentFilterData: value,
      },
    }
  }
}
