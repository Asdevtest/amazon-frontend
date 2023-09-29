import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { ActiveSubCategoryTablesKeys } from '@constants/table/active-sub-category-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { SettingsModel } from '@models/settings-model'

import { adminOrdersViewColumns } from '@components/table/table-columns/admin/orders-columns'

import { adminOrdersDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

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

  rowSelectionModel = undefined

  activeSubCategory = SettingsModel.activeSubCategoryState[ActiveSubCategoryTablesKeys.ADMIN_ORDERS] || 0

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminOrdersViewColumns()

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.currentOrdersData,
      () =>
        runInAction(() => {
          this.currentData = toJS(this.currentOrdersData)
        }),
    )
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

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  setActiveSubCategoryState(state) {
    SettingsModel.setActiveSubCategoryState(state, ActiveSubCategoryTablesKeys.ADMIN_ORDERS)
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_ORDERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_ORDERS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
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
      // const result = await AdministratorModel.getOrdersByStatus(ordersStatusBySubCategory[activeSubCategory])
      const result = await AdministratorModel.getOrdersPag(ordersStatusBySubCategory[activeSubCategory])

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
      this.rowSelectionModel = model
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }
}
