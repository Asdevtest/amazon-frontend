import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { AdministratorModel } from '@models/administrator-model'
import { SettingsModel } from '@models/settings-model'

import { exchangeInventoryColumns } from '@components/table/table-columns/admin/inventory-columns'

import { adminProductsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

export class AdminInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  productsBase = []
  products = []

  currentData = []

  rowSelectionModel = undefined

  selectedProduct = undefined

  sortModel = []
  filterModel = { items: [] }
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = exchangeInventoryColumns()

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.products,
      () =>
        runInAction(() => {
          this.currentData = toJS(this.products)
        }),
    )
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_INVENTORY)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_INVENTORY]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  // onClickTableRow(product) {
  //   this.history.push(
  //     {
  //       pathname: '/admin/inventory/product',
  //       search: product.originalData._id,
  //     },
  //     { inInventory: true },
  //   )
  // }

  onClickTableRow(product) {
    const url = `/admin/inventory/product?product-id=${product.originalData._id}`

    const newTab = window.open(`${url}`, '_blank')
    newTab.focus()
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    if (this.nameSearchValue) {
      runInAction(() => {
        this.products = this.productsBase.filter(
          item =>
            item.originalData.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            item.originalData.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            item.originalData.skusByClient[0]?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
        )
      })
    } else {
      runInAction(() => {
        this.products = this.productsBase
      })
    }
  }

  async getProducts() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await AdministratorModel.getProductsPaid()

      const productsData = adminProductsDataConverter(result)

      runInAction(() => {
        this.products = productsData.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
        this.productsBase = productsData.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)

      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
      runInAction(() => {
        this.products = []
      })
    }
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.rowSelectionModel = model
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
