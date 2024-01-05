import { makeAutoObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductStatus, ProductStatusByKey, ProductStatusGroups } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { supervisorProductsViewColumns } from '@components/table/table-columns/supervisor/supervisor-products-columns'

import { supervisorProductsDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

import { filtersFields } from './supervisor-products-view.comstants'

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined

  nameSearchValue = ''

  currentFilterStatus = ProductStatusByKey[ProductStatus.DEFAULT]
  currentStatusGroup = ProductStatusGroups.allProducts

  baseProducts = []
  productsMy = []

  sortModel = []
  startFilterModel = undefined
  filterModel = { items: [] }
  densityModel = 'compact'
  showAsinCheckerModal = false
  paginationModel = { page: 0, pageSize: 15 }
  rowCount = 0
  columnVisibilityModel = {}

  productCardModal = false

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

  constructor({ history }) {
    this.history = history

    if (history.location?.state?.dataGridFilter) {
      this.startFilterModel = history.location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, { autoBind: true })
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

  onClickStatusFilterButton(status) {
    this.currentStatusGroup = status
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
      console.log(error)
    }
  }

  async getProductsMy() {
    this.setRequestStatus(loadingStatuses.IS_LOADING)
    try {
      const ordered =
        this.columnMenuSettings.orderedYesNoFilterData.yes && this.columnMenuSettings.orderedYesNoFilterData.no
          ? null
          : this.columnMenuSettings.orderedYesNoFilterData.yes

      const result = await SupervisorModel.getProductsMyPag({
        filters: this.getFilters() + `${ordered !== null ? `;ordered[$eq]=${ordered}` : ''}`,

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
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
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
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'asin',
        'amazonTitle',
        'skuByClient',
      ]),
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
      this.setFilterRequestStatus(loadingStatuses.IS_LOADING)
      const ordered =
        this.columnMenuSettings.orderedYesNoFilterData.yes && this.columnMenuSettings.orderedYesNoFilterData.no
          ? null
          : this.columnMenuSettings.orderedYesNoFilterData.yes

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,
        `supervisors/products/pag/my?filters=${this.getFilters(column)}&statusGroup=${this.currentStatusGroup}` +
          `${ordered !== null ? `;ordered[$eq]=${ordered}` : ''}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.FAILED)

      console.log(error)
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
