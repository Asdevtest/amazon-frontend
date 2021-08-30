import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {AdministratorModel} from '@models/administrator-model'
import {SettingsModel} from '@models/settings-model'

import {copyToClipBoard} from '@utils/clipboard'

const productsStatusBySubCategory = {
  0: ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS],
  1: ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT],
  2: ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER],
  3: ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
  4: ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
  5: ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
  6: ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
  7: ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
}

export class AdminExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  activeSubCategory = 0
  currentProductsData = []

  selectionModel = undefined

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  drawerOpen = false
  showSetBarcodeModal = false
  selectedProduct = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeSubCategory(value) {
    this.activeSubCategory = value
    this.getProductsByStatus(value)
    this.getDataGridState()
  }

  dataGridTableKeyDependingOnActiveSubCategory() {
    switch (this.activeSubCategory) {
      case 0:
        return DataGridTablesKeys.ADMIN_EXCHANGE_NEW
      case 1:
        return DataGridTablesKeys.ADMIN_EXCHANGE_PURCHASED
      case 2:
        return DataGridTablesKeys.ADMIN_EXCHANGE_SUPPLIER_SEARCHING
      case 3:
        return DataGridTablesKeys.ADMIN_EXCHANGE_BUYER_WORK
      case 4:
        return DataGridTablesKeys.ADMIN_EXCHANGE_SUPPLIER_FOUNDED
      case 5:
        return DataGridTablesKeys.ADMIN_EXCHANGE_SUPPLIER_NOT_FOUNDED
      case 6:
        return DataGridTablesKeys.ADMIN_EXCHANGE_HIGH_PRICE
      case 7:
        return DataGridTablesKeys.ADMIN_EXCHANGE_CANCELED
    }
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, this.dataGridTableKeyDependingOnActiveSubCategory())
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.dataGridTableKeyDependingOnActiveSubCategory()]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
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

  onSelectionModel(model) {
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.currentProductsData)
  }

  async getProductsByStatus(activeSubCategory) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await AdministratorModel.getProductsByStatus({
        status: productsStatusBySubCategory[activeSubCategory],
      })

      runInAction(() => {
        this.currentProductsData = result
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
      this.currentProductsData = []
    }
  }

  onClickSaveBarcode = () => {}

  onClickBarcode = item => {
    if (item.barCode) {
      copyToClipBoard(item.barCode)
    } else {
      this.setSelectedProduct(item)
      this.onTriggerShowBarcodeModal()
    }
  }

  onClickExchange() {}

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerShowBarcodeModal()
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onTriggerShowBarcodeModal() {
    this.showSetBarcodeModal = !this.showSetBarcodeModal
  }

  setSelectedProduct(item) {
    this.selectedProduct = item
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
