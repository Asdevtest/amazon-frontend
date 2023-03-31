import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {ActiveSubCategoryTablesKeys} from '@constants/active-sub-category-tables-keys'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'

import {AdministratorModel} from '@models/administrator-model'
import {SettingsModel} from '@models/settings-model'

import {adminOrdersViewColumns} from '@components/table-columns/admin/orders-columns'

import {adminOrdersDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const ordersStatusBySubCategory = {
  0: OrderStatusByKey[OrderStatus.READY_TO_PROCESS],
  1: OrderStatusByKey[OrderStatus.AT_PROCESS],
  2: OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
  3: OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
  4: OrderStatusByKey[OrderStatus.IN_STOCK],
  5: OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER],
  6: OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
  7: OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT],
  8: OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
}

export class AdminOrdersAllViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  orderData = []
  currentOrdersData = []

  currentData = []

  baseNoConvertedOrders = []

  selectionModel = undefined

  activeSubCategory = SettingsModel.activeSubCategoryState[ActiveSubCategoryTablesKeys.ADMIN_ORDERS] || 0
  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = adminOrdersViewColumns()

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.currentOrdersData,
      () =>
        runInAction(() => {
          this.currentData = toJS(this.currentOrdersData)
        }),
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = this.columnsModel.map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      this.currentOrdersData = adminOrdersDataConverter(this.baseNoConvertedOrders).sort(
        sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
      )
    }
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    if (this.nameSearchValue) {
      runInAction(() => {
        this.currentOrdersData = this.orderData.filter(
          item =>
            item.originalData.product.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            item.originalData.product.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
            item.originalData.product.skusByClient[0]?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
        )
      })
    } else {
      runInAction(() => {
        this.currentOrdersData = this.orderData
      })
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  setActiveSubCategoryState(state) {
    SettingsModel.setActiveSubCategoryState(state, ActiveSubCategoryTablesKeys.ADMIN_ORDERS)
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_ORDERS]

    if (state) {
      runInAction(() => {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = adminOrdersViewColumns().map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      })
    }
  }

  onClickTableRow(order) {
    this.history.push({
      pathname: '/admin/orders/order',
      search: order.originalData._id,
    })
  }

  onChangeSubCategory(value) {
    this.setActiveSubCategoryState(value)
    runInAction(() => {
      this.activeSubCategory = value
    })
    this.getOrdersByStatus(value)
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  async getOrdersByStatus(activeSubCategory) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.error = undefined
      })
      this.getDataGridState()
      const result = await AdministratorModel.getOrdersByStatus(ordersStatusBySubCategory[activeSubCategory])

      runInAction(() => {
        this.baseNoConvertedOrders = result

        this.orderData = adminOrdersDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
        this.currentOrdersData = adminOrdersDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
        this.currentOrdersData = []
      })
    }
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectionModel = model
    })
  }

  onChangeDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage = e => {
    runInAction(() => {
      this.curPage = e
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
  }
}
