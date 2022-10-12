import {makeAutoObservable, runInAction} from 'mobx'

import {BuyerDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'

import {DashboardModel} from '@models/dashboard-model'
import {UserModel} from '@models/user-model'

export class BuyerDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  drawerOpen = false
  balance = UserModel.userInfo?.balance

  dashboardData = {
    [BuyerDashboardCardDataKey.ALL_PRODUCTS]: '',
    [BuyerDashboardCardDataKey.SUCCESS_PRODUCTS]: '',
    [BuyerDashboardCardDataKey.PAYED_PRODUCTS]: '',

    [BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR]: '',
    [BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT]: '',
    [BuyerDashboardCardDataKey.IN_SEARCH_PRODUCTS]: '',
    [BuyerDashboardCardDataKey.REJECTED_PRODUCTS]: '',

    [BuyerDashboardCardDataKey.IN_PROCESS_ORDERS]: '',
    [BuyerDashboardCardDataKey.FREE_ORDERS]: '',
    [BuyerDashboardCardDataKey.CLOSED_ORDERS]: '',

    [BuyerDashboardCardDataKey.REPLENISH]: '',
    [BuyerDashboardCardDataKey.FINES]: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      this.getDashboardElementCount()

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onClickInfoCardViewMode(route, dataGridFilter) {
    if (dataGridFilter) {
      this.history.push(route, {dataGridFilter})
    } else {
      this.history.push(route)
    }
  }

  async getDashboardElementCount() {
    try {
      const result = await DashboardModel.getBuyerDashboadItems()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,

          [BuyerDashboardCardDataKey.ALL_PRODUCTS]: result.products.all,
          [BuyerDashboardCardDataKey.SUCCESS_PRODUCTS]: result.products.success,
          [BuyerDashboardCardDataKey.PAYED_PRODUCTS]: result.products.paid,

          [BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR]: result.products.newSearchFromSupervisor,
          [BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT]: result.products.newSearchFromClient,
          [BuyerDashboardCardDataKey.IN_SEARCH_PRODUCTS]: result.products.inProcessOfSearching,
          [BuyerDashboardCardDataKey.REJECTED_PRODUCTS]: result.products.canceled,

          [BuyerDashboardCardDataKey.IN_PROCESS_ORDERS]: result.orders.inProcess,
          [BuyerDashboardCardDataKey.FREE_ORDERS]: result.orders.free,
          [BuyerDashboardCardDataKey.CLOSED_ORDERS]: result.orders.completed,

          [BuyerDashboardCardDataKey.REPLENISH]: result.finances.accruals,
          [BuyerDashboardCardDataKey.FINES]: result.finances.fines,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
