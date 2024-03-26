import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { BuyerDashboardCardDataKey } from '@constants/navigation/dashboard-configs'

import { DashboardModel } from '@models/dashboard-model'
import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'

export class BuyerDashboardViewModel {
  history = undefined
  requestStatus = undefined
  balance = UserModel.userInfo?.balance

  currentData = undefined

  dashboardData = undefined

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.dashboardData,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  async loadData() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatus.IS_LOADING
      })

      this.getDashboardElementCount()

      runInAction(() => {
        this.requestStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatus.FAILED
      })
      console.error(error)
    }
  }

  getCurrentData() {
    return this.dashboardData
  }

  onClickInfoCardViewMode(route, dataGridFilter) {
    if (dataGridFilter) {
      this.history.push(route, { dataGridFilter })
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

          [BuyerDashboardCardDataKey.MY_ORDERS_NOT_PAID]: result.orders.notPaid,
          [BuyerDashboardCardDataKey.MY_ORDERS_NEED_TRACK_NUMBER]: result.orders.needTrackNumber,
          [BuyerDashboardCardDataKey.MY_ORDERS_INBOUND]: result.orders.inbound,
          [BuyerDashboardCardDataKey.MY_ORDERS_CONFIRMATION_REQUIRED]: result.orders.confirmationRequired,
          [BuyerDashboardCardDataKey.MY_ORDERS_CLOSED_AND_CANCELED]: result.orders.closedAndCanceled,
          [BuyerDashboardCardDataKey.MY_ORDERS_ALL_ORDERS]: result.orders.all,

          [BuyerDashboardCardDataKey.FREE_ORDERS]: result.orders.free,

          [BuyerDashboardCardDataKey.PENDING_ORDERS_PEDING]: result.pendingOrders.pending,
          [BuyerDashboardCardDataKey.PENDING_ORDERS_READY_TO_BUY]: result.pendingOrders.readyToBuy,

          [BuyerDashboardCardDataKey.FINANCES_ACCRUALS]: result.finances.accruals,
          [BuyerDashboardCardDataKey.FINANCES_FINES]: result.finances.fines,
          [BuyerDashboardCardDataKey.FINANCES_REFUNDS]: result.finances.refunds,
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}
