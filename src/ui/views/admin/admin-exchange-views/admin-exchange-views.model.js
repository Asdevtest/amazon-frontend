import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ActiveSubCategoryTablesKeys } from '@constants/table/active-sub-category-tables-keys'
import {
  AdminExchangeStatusesCategories,
  adminExchangeStatusesByCategory,
} from '@constants/table/tables-filter-btns-configs'

import { AdministratorModel } from '@models/administrator-model'
import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'
import { TableSettingsModel } from '@models/table-settings'

import { adminExchangeColumns } from '@components/table/table-columns/admin/admin-exchange-columns'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

const filtersFields = [
  'asin',
  'skuByClient',
  'amazonTitle',
  'strategyStatus',
  'amazon',
  'createdBy',
  'checkedBy',
  'buyer',
  'profit',
  'profit',
  'margin',
  'bsr',
  'fbafee',
  'fbaamount',
  'updatedAt',
  'createdAt',
  'checkednotes',
]

export class AdminExchangeViewModel {
  history = undefined
  requestStatus = undefined

  productCardModal = false

  activeCategory = AdminExchangeStatusesCategories.all
  currentProductsData = []

  rowSelectionModel = undefined

  currentData = []

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'

  rowHandlers = {
    onClickOpenInNewTab: id => this.onClickTableRow(id),
  }
  columnsModel = adminExchangeColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  rowsCount = 0
  columnVisibilityModel = {}

  showSetBarcodeModal = false
  selectedProduct = undefined

  currentSearchValue = ''
  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getProductsByStatus()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.currentProductsData,
      () => {
        this.currentData = this.getCurrentData()
      },
    )

    reaction(
      () => this.columnVisibilityModel,
      () => (this.currentData = this.getCurrentData()),
    )
  }

  onPaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getProductsByStatus()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getProductsByStatus()
  }

  onChangeSubCategory(value) {
    this.columnVisibilityModel = {}
    this.setActiveSubCategoryState(value)
    this.activeCategory = value
    this.setDataGridState()
    this.loadData()
  }

  onClickTableRow(id) {
    window.open(`/admin/exchange/product?product-id=${id}`, '_blank').focus()
  }

  setActiveSubCategoryState(state) {
    SettingsModel.setActiveSubCategoryState(state, ActiveSubCategoryTablesKeys.ADMIN_EXCHANGE)
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_EXCHANGE)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.ADMIN_EXCHANGE)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  async onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    await this.getProductsByStatus()
    this.setDataGridState()
  }

  getCurrentData() {
    return toJS(this.currentProductsData)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()
      await this.getProductsByStatus()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getProductsByStatus() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const result = await AdministratorModel.getProductsPag({
        status: adminExchangeStatusesByCategory[this.activeCategory].join(),

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        filters: this.getFilters(),
      })

      // const productsData = adminProductsDataConverter(result);

      runInAction(() => {
        this.rowsCount = result.count
        this.currentProductsData = result.rows
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
      runInAction(() => {
        this.currentProductsData = []
      })
    }
  }

  setSelectedProduct(item) {
    runInAction(() => {
      this.selectedProduct = item
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  onClickShowProduct(id) {
    const win = window.open(`${window.location.origin}/admin/exchange/product?product-id=${id}`, '_blank')

    win.focus()
  }

  onClickProductModal(row) {
    if (window.getSelection().toString()) {
      return
    }

    if (row) {
      this.history.push(`/admin/exchange?product-id=${row._id}`)
    } else {
      this.history.push(`/admin/exchange`)
    }

    this.onTriggerOpenModal('productCardModal')
  }

  // * Filtration

  getFilters(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.currentSearchValue, exclusion, filtersFields, []),
    )
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
    this.setDataGridState()
    this.getProductsByStatus()
  }

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        ...dataGridFiltersInitializer(filtersFields),
      }
    })

    this.getProductsByStatus()
    this.getDataGridState()
  }

  setFilterRequestStatus(requestStatus) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)
      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,

        `admins/products/pag?filters=${this.getFilters(column)}&status=${adminExchangeStatusesByCategory[
          this.activeCategory
        ].join()}`,
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
      runInAction(() => {
        this.error = error
      })
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
  }
}
