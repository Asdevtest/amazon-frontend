import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByCode, ProductStatusByKey} from '@constants/product-status'

import {SettingsModel} from '@models/settings-model'
import {SupervisorModel} from '@models/supervisor-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  productsMy = []

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.SUPERVISOR_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_PRODUCTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
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
    return toJS(this.productsMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProductsMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsMy() {
    try {
      const result = await SupervisorModel.getProductsMy()
      const productsBuyerFoundSupplier = result.filter(
        product => ProductStatusByCode[product.status] === ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
      )
      const productsBuyerNotFoundSupplier = result.filter(
        product => ProductStatusByCode[product.status] !== ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
      )

      runInAction(() => {
        // Если статус продукта BUYER_FOUND_SUPPLIER то поднимаем его вверх списка, если нет то сортируем по дате
        this.productsMy = [
          ...productsBuyerFoundSupplier.sort(sortObjectsArrayByFiledDate('createdat')),
          ...productsBuyerNotFoundSupplier.sort(sortObjectsArrayByFiledDate('createdat')),
        ]
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickTableRow(item) {
    this.history.push('/supervisor/product', {product: toJS(item)})
  }

  onClickResearcherName() {}

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePage(e, value) {
    this.curPage = value
  }
}
