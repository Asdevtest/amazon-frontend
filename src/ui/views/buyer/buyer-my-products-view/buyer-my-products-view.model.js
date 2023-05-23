import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { BuyerModel } from '@models/buyer-model'
import { ResearcherModel } from '@models/researcher-model'
import { SettingsModel } from '@models/settings-model'

import { buyerProductsViewColumns } from '@components/table/table-columns/buyer/buyer-products-columns'

import { buyerProductsDataConverter } from '@utils/data-grid-data-converters'
import { objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

export class BuyerMyProductsViewModel {
  history = undefined
  requestStatus = undefined

  baseNoConvertedProducts = []
  productsMy = []

  currentData = []

  nameSearchValue = ''

  rowHandlers = {
    onClickFeesCalculate: item => this.onClickFeesCalculate(item),
  }

  rowCount = 0
  sortModel = []
  startFilterModel = undefined
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = buyerProductsViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
    })

    if (location?.state?.dataGridFilter) {
      runInAction(() => {
        this.startFilterModel = location.state.dataGridFilter
      })
    }
    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.productsMy,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  async onClickFeesCalculate(productId) {
    try {
      const result = await ResearcherModel.parseParseSellerCentral(productId)

      BuyerModel.updateProduct(productId, { fbafee: result.amazonFee })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.getProductsMy()

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.getProductsMy()

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.getProductsMy()

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.BUYER_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_PRODUCTS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(
          this.startFilterModel
            ? {
                ...this.startFilterModel,
                items: this.startFilterModel.items.map(el => ({ ...el, value: el.value.map(e => t(e)) })),
              }
            : state.filterModel,
        )
        this.paginationModel = toJS({ ...state.paginationModel, page: 0 })
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
    this.getProductsMy()
    this.setDataGridState()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.rowSelectionModel = model
    })
  }

  getCurrentData() {
    return toJS(this.productsMy)
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    this.getProductsMy()
  }

  async loadData() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatuses.isLoading
      })

      this.getDataGridState()
      await this.getProductsMy()
      runInAction(() => {
        this.requestStatus = loadingStatuses.success
      })
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatuses.failed
      })
      console.log(error)
    }
  }

  async getProductsMy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.error = undefined
      })

      // const result = await BuyerModel.getProductsMy()

      // const filter = `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};`

      const filter = objectToUrlQs({
        or: [
          { asin: { $contains: this.nameSearchValue } },
          { amazonTitle: { $contains: this.nameSearchValue } },
          { skusByClient: { $contains: this.nameSearchValue } },
        ],
      })

      const result = await BuyerModel.getProductsMyPag({
        filters: this.nameSearchValue ? filter : null,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.rowCount = result.count

        this.baseNoConvertedProducts = result.rows

        this.productsMy = buyerProductsDataConverter(result.rows)
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.baseNoConvertedProducts = []
        this.productsMy = []
      })
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  onClickTableRow(row) {
    const win = window.open(
      `${window.location.origin}/buyer/my-products/product?product-id=${row.originalData._id}`,
      '_blank',
    )

    win.focus()
  }
}
