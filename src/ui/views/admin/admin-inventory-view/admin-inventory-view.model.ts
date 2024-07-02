import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'

import { AdministratorModel } from '@models/administrator-model'
import { GeneralModel } from '@models/general-model'
import { TableSettingsModel } from '@models/table-settings'

import { exchangeInventoryColumns } from '@components/table/table-columns/admin/inventory-columns'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

const statuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
  ProductStatusByKey[ProductStatus.SUPPLIER_FOUND],
]

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
  'client',
  'currentSupplier',
  'status',
]

export class AdminInventoryViewModel {
  history = undefined
  requestStatus = undefined

  productCardModal = false

  nameSearchValue = ''

  productsBase = []
  products = []

  currentData = []
  currentSearchValue = ''

  rowSelectionModel = undefined

  paginationModel = { page: 0, pageSize: 15 }
  sortModel = []
  filterModel = { items: [] }
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'

  rowHandlers = {
    onClickOpenInNewTab: id => this.onClickTableRow(id),
  }
  columnsModel = exchangeInventoryColumns(this.rowHandlers)

  rowsCount = 0

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getProducts()
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
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_INVENTORY)
  }

  onClickTableRow(id) {
    window.open?.(`/admin/inventory/product?product-id=${id}`, '_blank')?.focus?.()
  }

  async getProducts() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await AdministratorModel.getProductsPag({
        status: statuses.join(),

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        filters: this.getFilters(),
      })

      runInAction(() => {
        this.rowsCount = result.count
        this.products = result.rows
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)

      console.error(error)

      runInAction(() => {
        this.products = []
      })
    }
  }

  onClickShowProduct(id) {
    window?.open?.(`/admin/inventory/product?product-id=${id}`, '_blank')?.focus?.()
  }

  onClickProductModal(row) {
    if (row) {
      this.history.push(`/admin/inventory?product-id=${row._id}`)
    } else {
      this.history.push(`/admin/inventory`)
    }

    this.onTriggerOpenModal('productCardModal')
  }

  getFilters(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'asin',
        'skuByClient',
        'amazonTitle',
      ]),
    )
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)
      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,

        `admins/products/pag?filters=${this.getFilters(column)}&status=${statuses.join()}`,
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
}
