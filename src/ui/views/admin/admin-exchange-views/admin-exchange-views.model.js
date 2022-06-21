import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {ActiveSubCategoryTablesKeys} from '@constants/active-sub-category-tables-keys'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {AdministratorModel} from '@models/administrator-model'
import {SettingsModel} from '@models/settings-model'

import {exchangeProductsColumns} from '@components/table-columns/admin/exchange-columns'

import {adminProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const productsStatusBySubCategory = {
  0: ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT], // 5 статус
  1: ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR], // 15 статус
  2: ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
  3: ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT],
  4: ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
  5: ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
  6: ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
  7: ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS],
  8: ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
  9: ProductStatusByKey[ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND],
}

export class AdminExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  activeSubCategory = SettingsModel.activeSubCategoryState[ActiveSubCategoryTablesKeys.ADMIN_EXCHANGE] || 0
  currentProductsData = []

  selectionModel = undefined

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = exchangeProductsColumns({activeSubCategory: this.activeSubCategory})

  drawerOpen = false
  showSetBarcodeModal = false
  selectedProduct = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
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

  onChangeSubCategory(value) {
    this.setActiveSubCategoryState(value)
    this.activeSubCategory = value
    this.getProductsByStatus(value)
    this.getDataGridState()
  }

  onClickTableRow(product) {
    this.history.push({
      pathname: '/admin/exchange/product',
      search: product.originalData._id,
    })
  }

  dataGridTableKeyDependingOnActiveSubCategory() {
    switch (this.activeSubCategory) {
      case 0:
        return DataGridTablesKeys.ADMIN_EXCHANGE_CREATED
      case 1:
        return DataGridTablesKeys.ADMIN_EXCHANGE_CHECKED_BY_SUPERVISOR
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
        return DataGridTablesKeys.ADMIN_EXCHANGE_PUBLISHED
      case 8:
        return DataGridTablesKeys.ADMIN_EXCHANGE_CANCELED
      case 9:
        return DataGridTablesKeys.COMPLETE_SUPPLIER_WAS_NOT_FOUND
    }
  }

  setActiveSubCategoryState(state) {
    SettingsModel.setActiveSubCategoryState(state, ActiveSubCategoryTablesKeys.ADMIN_EXCHANGE)
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, this.dataGridTableKeyDependingOnActiveSubCategory())
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.dataGridTableKeyDependingOnActiveSubCategory()]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = exchangeProductsColumns({activeSubCategory: this.activeSubCategory}).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.currentProductsData)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getProductsByStatus()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsByStatus() {
    try {
      const result = await AdministratorModel.getProductsByStatus({
        status: productsStatusBySubCategory[this.activeSubCategory],
      })

      const productsData = adminProductsDataConverter(result)

      runInAction(() => {
        this.currentProductsData = productsData.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      this.error = error
      this.currentProductsData = []
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  setSelectedProduct(item) {
    this.selectedProduct = item
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
