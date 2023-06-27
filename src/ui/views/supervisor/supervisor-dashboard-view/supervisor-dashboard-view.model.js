import { makeAutoObservable, runInAction } from 'mobx'

import { SupervisorDashboardCardDataKey } from '@constants/navigation/dashboard-configs'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DashboardModel } from '@models/dashboard-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

export class SupervisorDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsVacant = []
  producatsMy = []
  paymentsMy = []

  dashboardData = {
    [SupervisorDashboardCardDataKey.ALL_PRODUCTS]: '',
    [SupervisorDashboardCardDataKey.SUCCESS_PRODUCTS]: '',
    [SupervisorDashboardCardDataKey.PAYED_PRODUCTS]: '',

    [SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_RESEARCHER]: '',
    [SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT]: '',
    [SupervisorDashboardCardDataKey.ON_CHECKING]: '',
    [SupervisorDashboardCardDataKey.AWAIT_SOLVE]: '',

    [SupervisorDashboardCardDataKey.IN_SEARCH_PRODUCTS]: '',
    [SupervisorDashboardCardDataKey.REJECTED_PRODUCTS]: '',

    [SupervisorDashboardCardDataKey.REPLENISH]: '',
    [SupervisorDashboardCardDataKey.FINES]: '',
  }
  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatuses.isLoading
      })

      this.getDashboardElementCount()
      runInAction(() => {
        this.requestStatus = loadingStatuses.success
      })
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatuses.failed
      })
      console.log(error)
    }
  }

  async getDashboardElementCount() {
    try {
      const result = await DashboardModel.getSupervisorDashboadItems()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,

          [SupervisorDashboardCardDataKey.ALL_PRODUCTS]: result.products.all,
          [SupervisorDashboardCardDataKey.SUCCESS_PRODUCTS]: result.products.publishedOnExchange,
          [SupervisorDashboardCardDataKey.PAYED_PRODUCTS]: result.products.paid,

          [SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_RESEARCHER]: result.checking.checkFromResearcher,
          [SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT]: result.checking.newSearchFromClient,
          [SupervisorDashboardCardDataKey.ON_CHECKING]: result.checking.onReview,
          [SupervisorDashboardCardDataKey.AWAIT_SOLVE]: result.checking.waitingToCheck,

          [SupervisorDashboardCardDataKey.IN_SEARCH_PRODUCTS]: result.checking.inWorkBuyer,
          [SupervisorDashboardCardDataKey.REJECTED_PRODUCTS]: result.products.rejected,

          [SupervisorDashboardCardDataKey.REPLENISH]: result.finances.accruals,
          [SupervisorDashboardCardDataKey.FINES]: result.finances.fines,
        }
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickInfoCardViewMode(route, dataGridFilter) {
    if (dataGridFilter) {
      this.history.push(route, { dataGridFilter })
    } else {
      this.history.push(route)
    }
  }

  async getProductsVacant() {
    try {
      const result = await SupervisorModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = result.filter(el => el.icomment !== '')
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }
}
