import { makeAutoObservable, runInAction } from 'mobx'

// import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
// import {loadingStatuses} from '@constants/loading-statuses'

// import {BuyerModel} from '@models/buyer-model'
// import {ResearcherModel} from '@models/researcher-model'
// import {SettingsModel} from '@models/settings-model'

// import {buyerProductsViewColumns} from '@components/table-columns/buyer/buyer-products-columns'

// import {buyerProductsDataConverter} from '@utils/data-grid-data-converters'
// import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
// import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class ModeratorMyProductsViewModel {
  history = undefined
  requestStatus = undefined

  productsMy = []

  // sortModel = []
  // filterModel = {items: []}

  // rowHandlers = {
  //   onClickFeesCalculate: item => this.onClickFeesCalculate(item),
  // }

  // sortModel = []
  // filterModel = {items: []}
  // curPage = 0
  // rowsPerPage = 15
  // densityModel = 'compact'
  // columnsModel = buyerProductsViewColumns(this.rowHandlers)

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  // async onClickFeesCalculate(product) {
  //   try {
  //     const result = await ResearcherModel.parseParseSellerCentral(product.id)

  //     BuyerModel.updateProduct(product._id, {fbafee: result.amazonFee})
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // onChangeFilterModel(model) {
  //   this.filterModel = model
  // }

  // setDataGridState(state) {
  //   const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
  //     'sorting',
  //     'filter',
  //     'pagination',
  //     'density',
  //     'columns',
  //   ])

  //   SettingsModel.setDataGridState(requestState, DataGridTablesKeys.BUYER_PRODUCTS)
  // }

  // getDataGridState() {
  //   const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_PRODUCTS]

  //   if (state) {
  //     this.sortModel = state.sorting.sortModel
  //     this.filterModel = state.filter.filterModel
  //     this.rowsPerPage = state.pagination.pageSize

  //     this.densityModel = state.density.value
  //     this.columnsModel = buyerProductsViewColumns(this.rowHandlers).map(el => ({
  //       ...el,
  //       hide: state.columns?.lookup[el?.field]?.hide,
  //     }))
  //   }
  // }

  // onChangeRowsPerPage(e) {
  //   this.rowsPerPage = e
  // }

  // setRequestStatus(requestStatus) {
  //   this.requestStatus = requestStatus
  // }

  // onChangeSortingModel(e) {
  //   this.sortModel = e.sortModel
  // }

  // onSelectionModel(model) {
  //   this.rowSelectionModel = model
  // }

  // getCurrentData() {
  //   return toJS(this.productsMy)
  // }

  // async loadData() {
  //   try {
  //     this.requestStatus = loadingStatuses.isLoading

  //     this.getDataGridState()
  //     await this.getProductsMy()
  //     this.requestStatus = loadingStatuses.success
  //   } catch (error) {
  //     this.requestStatus = loadingStatuses.failed
  //     console.log(error)
  //   }
  // }

  // async getProductsMy() {
  //   try {
  //     this.setRequestStatus(loadingStatuses.isLoading)
  //     this.error = undefined
  //     const result = await BuyerModel.getProductsMy()
  //     runInAction(() => {
  //       this.productsMy = buyerProductsDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
  //     })
  //     this.setRequestStatus(loadingStatuses.success)
  //   } catch (error) {
  //     this.setRequestStatus(loadingStatuses.failed)
  //     console.log(error)
  //     if (error.body && error.body.message) {
  //       this.error = error.body.message
  //     }
  //   }
  // }

  // onClickTableRow(item) {
  //   this.history.push({
  //     pathname: '/buyer/my-products/product',
  //     search: item.originalData._id,
  //   })
  // }

  // onChangeCurPage(e) {
  //   this.curPage = e
  // }
}
