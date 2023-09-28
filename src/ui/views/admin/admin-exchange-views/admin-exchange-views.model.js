import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { ActiveSubCategoryTablesKeys } from '@constants/table/active-sub-category-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { SettingsModel } from '@models/settings-model'

import { adminExchangeColumns } from '@components/table/table-columns/admin/admin-exchange-columns'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

const filtersFields = []

export class AdminExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  activeSubCategory = SettingsModel.activeSubCategoryState[ActiveSubCategoryTablesKeys.ADMIN_EXCHANGE] || 0
  currentProductsData = []

  rowSelectionModel = undefined

  currentData = []

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminExchangeColumns()

  paginationModel = { page: 0, pageSize: 15 }
  rowsCount = 0
  columnVisibilityModel = {}

  showSetBarcodeModal = false
  selectedProduct = undefined

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

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
    this.getProductsByStatus()
  }

  onChangePaginationModelChange(model) {
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
    this.activeSubCategory = value
    this.setDataGridState()
    this.loadData()
  }

  onClickTableRow(product) {
    this.history.push({
      pathname: '/admin/exchange/product',
      search: `product-id=${product._id}`,
    })
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_EXCHANGE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_EXCHANGE]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }

  getCurrentData() {
    return toJS(this.currentProductsData)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getProductsByStatus()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsByStatus() {
    try {
      const result = await AdministratorModel.getProductsPag({
        status: this.activeSubCategory,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      // const productsData = adminProductsDataConverter(result);

      runInAction(() => {
        this.rowsCount = result.count
        this.currentProductsData = result.rows
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
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

  // * Filtration

  getFilters(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.currentSearchValue, exclusion, filtersFields, [
        'parentProductSkusByClient',
        'parentProductAmazonTitle',
        'parentProductAsin',
        'childProductAmazonTitle',
        'childProductSkusByClient',
        'childProductAsin',
        'title',
      ]),
    )
  }
}
