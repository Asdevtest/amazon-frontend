import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'
import {SettingsModel} from '@models/settings-model'

import {exchangeInventoryColumns} from '@components/table-columns/admin/inventory-columns'

import {adminProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AdminInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  productsBase = []
  products = []

  currentData = []

  selectionModel = undefined

  drawerOpen = false
  selectedProduct = undefined

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = exchangeInventoryColumns()

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.products,
      () => {
        this.currentData = toJS(this.products)
      },
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_INVENTORY)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_INVENTORY]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = exchangeInventoryColumns().map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onClickTableRow(product) {
    this.history.push(
      {
        pathname: '/admin/inventory/product',
        search: product.originalData._id,
      },
      {inInventory: true},
    )
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    if (this.nameSearchValue) {
      this.products = this.productsBase.filter(
        item =>
          item.originalData.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          item.originalData.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          item.originalData.skusByClient[0]?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      this.products = this.productsBase
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
        this.error = error.body.message
      }
      this.products = []
    }
  }

  CurrentData() {
    return toJS(this.products)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
