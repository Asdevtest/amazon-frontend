import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'
import {ResearcherModel} from '@models/researcher-model'
import {SettingsModel} from '@models/settings-model'

import {buyerProductsViewColumns} from '@components/table-columns/buyer/buyer-products-columns'

import {buyerProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {resetDataGridFilter} from '@utils/filters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class BuyerMyProductsViewModel {
  history = undefined
  requestStatus = undefined

  baseNoConvertedProducts = []
  productsMy = []
  drawerOpen = false

  nameSearchValue = ''

  rowHandlers = {
    onClickFeesCalculate: item => this.onClickFeesCalculate(item),
  }

  sortModel = []
  startFilterModel = undefined
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = buyerProductsViewColumns(this.rowHandlers)

  constructor({history, location}) {
    this.history = history

    if (location?.state?.dataGridFilter) {
      this.startFilterModel = location.state.dataGridFilter
    } else {
      this.startFilterModel = resetDataGridFilter
    }

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      this.productsMy = buyerProductsDataConverter(
        this.baseNoConvertedProducts.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')),
      )
    }
  }

  async onClickFeesCalculate(product) {
    try {
      const result = await ResearcherModel.parseParseSellerCentral(product.id)

      BuyerModel.updateProduct(product._id, {fbafee: result.amazonFee})
    } catch (error) {
      console.log(error)
    }
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.BUYER_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.BUYER_PRODUCTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = this.startFilterModel
        ? {
            ...this.startFilterModel,
            items: this.startFilterModel.items.map(el => ({...el, value: el.value.map(e => t(e))})),
          }
        : state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = buyerProductsViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(
        this.productsMy.filter(
          el =>
            el.originalData.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            el.originalData.skusByClient?.some(sku => sku.toLowerCase().includes(this.nameSearchValue.toLowerCase())) ||
            el.originalData.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
        ),
      )
    } else {
      return toJS(this.productsMy)
    }
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      this.getDataGridState()
      await this.getProductsMy()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProductsMy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await BuyerModel.getProductsMy()
      runInAction(() => {
        this.baseNoConvertedProducts = result

        this.productsMy = buyerProductsDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickTableRow(item) {
    this.history.push({
      pathname: '/buyer/my-products/product',
      search: item.originalData._id,
    })
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }
}
