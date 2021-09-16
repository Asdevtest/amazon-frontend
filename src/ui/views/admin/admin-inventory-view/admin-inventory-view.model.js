import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'
import {SettingsModel} from '@models/settings-model'

import {exchangeInventoryColumns} from '@components/table-columns/admin/inventory-columns'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class AdminInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  products = []

  selectionModel = undefined

  drawerOpen = false
  selectedProduct = undefined

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  columns = exchangeInventoryColumns()

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.ADMIN_INVENTORY)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_INVENTORY]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onClickTableRow(product) {
    this.history.push('/admin/product', {product: toJS(product)})
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  async getProducts() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await AdministratorModel.getProductsPaid()

      const productsData = result.map(product => ({
        ...getObjectFilteredByKeyArrayBlackList(product, ['_id']),
        id: product._id,
      }))

      runInAction(() => {
        this.products = productsData
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
      this.products = []
    }
  }

  getCurrentData() {
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
