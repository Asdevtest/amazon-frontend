import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid/data-grid-tables-keys'
import {ProductStatus, ProductStatusByKey} from '@constants/product/product-status'
import {loadingStatuses} from '@constants/statuses/loading-statuses'

import {SettingsModel} from '@models/settings-model'
import {SupervisorModel} from '@models/supervisor-model'

import {supervisorProductsViewColumns} from '@components/table/table-columns/supervisor/supervisor-products-columns'

import {supervisorProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class SupervisorProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  currentFilterStatus = ProductStatusByKey[ProductStatus.DEFAULT]

  currentData = []

  baseProducts = []
  productsMy = []

  sortModel = []
  startFilterModel = undefined
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = supervisorProductsViewColumns()
  showAsinCheckerModal = false

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location?.state?.dataGridFilter) {
        this.startFilterModel = location.state.dataGridFilter
      }
    })

    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.productsMy,
      () => {
        this.currentData = this.getCurrentData()
      },
    )

    reaction(
      () => this.nameSearchValue,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = supervisorProductsViewColumns().map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      runInAction(() => {
        this.productsMy = this.baseProducts
      })
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SUPERVISOR_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_PRODUCTS]

    runInAction(() => {
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
        this.columnsModel = supervisorProductsViewColumns().map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
  }

  onClickStatusFilterButton(status) {
    runInAction(() => {
      this.currentFilterStatus = status
      this.productsMy = this.getFilteredProductsByStatus(status)
    })
  }

  getProductsCountByStatus(status) {
    return this.getFilteredProductsByStatus(status).length
  }

  getFilteredProductsByStatus(status) {
    if (Number(status) === Number(ProductStatusByKey[ProductStatus.DEFAULT])) {
      return this.baseProducts
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT])) {
      return this.baseProducts.filter(
        product => Number(product.status) === Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT]),
      )
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS])) {
      return this.baseProducts.filter(
        product =>
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS]),
      )
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.SUPPLIER_FOUND])) {
      return this.baseProducts.filter(
        product =>
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER]) ||
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER]) ||
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER]),
      )
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT])) {
      return this.baseProducts.filter(
        product =>
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT]) ||
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT]) ||
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]) ||
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]),
      )
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND])) {
      return this.baseProducts.filter(
        product =>
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND]) ||
          Number(product.status) ===
            Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND]) ||
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER]) ||
          Number(product.status) ===
            Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER]),
      )
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR])) {
      return this.baseProducts.filter(
        product =>
          Number(product.status) ===
            Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR]) ||
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR]),
      )
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE])) {
      return this.baseProducts.filter(
        product =>
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE]) ||
          Number(product.status) ===
            Number(ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE]),
      )
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP])) {
      return this.baseProducts.filter(
        product =>
          Number(product.status) === Number(ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP]),
      )
    }

    if (Number(status) === Number(ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT])) {
      return this.baseProducts.filter(
        product => Number(product.status) === Number(ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT]),
      )
    }
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
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectionModel = model
    })
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
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getProductsMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsMy() {
    try {
      const result = await SupervisorModel.getProductsMy()

      runInAction(() => {
        this.baseProducts = supervisorProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )

        this.productsMy = this.baseProducts
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  onClickTableRow(row) {
    const win = window.open(
      `${window.location.origin}/supervisor/products/product?product-id=${row.originalData._id}`,
      '_blank',
    )

    win.focus()
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
