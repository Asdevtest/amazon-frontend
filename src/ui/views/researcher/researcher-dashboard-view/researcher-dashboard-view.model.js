import { makeAutoObservable, runInAction } from 'mobx'

import { ResearcherDashboardCardDataKey } from '@constants/navigation/dashboard-configs'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DashboardModel } from '@models/dashboard-model'
import { UserModel } from '@models/user-model'

export class ResearcherDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  productsVacant = []
  paymentsMy = []

  dashboardData = {
    [ResearcherDashboardCardDataKey.ALL_PRODUCTS]: '',
    [ResearcherDashboardCardDataKey.SUCCESS_PRODUCTS]: '',

    [ResearcherDashboardCardDataKey.REJECTED_PRODUCTS]: '',
    [ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING]: '',
    [ResearcherDashboardCardDataKey.ON_SUPPLIER_SEEKING_BY_BUYER]: '',
    [ResearcherDashboardCardDataKey.NO_STATUS]: '',

    [ResearcherDashboardCardDataKey.REPLENISH]: '',
    [ResearcherDashboardCardDataKey.FINES]: '',
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
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getDashboardElementCount()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getDashboardElementCount() {
    try {
      const result = await DashboardModel.getResearcherDashboadItems()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,

          [ResearcherDashboardCardDataKey.ALL_PRODUCTS]: result.products.all,
          // [ResearcherDashboardCardDataKey.SUCCESS_PRODUCTS]: result.products.completed,

          [ResearcherDashboardCardDataKey.REJECTED_PRODUCTS]: result.products.rejected,
          [ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING]: result.products.inWork,
          // [ResearcherDashboardCardDataKey.ON_SUPPLIER_SEEKING_BY_BUYER]: result.products.searchSupplierFromBuyer,
          // [ResearcherDashboardCardDataKey.NO_STATUS]: result.products.withoutStatus,

          // [ResearcherDashboardCardDataKey.REPLENISH]: result.finances.accruals,
          // [ResearcherDashboardCardDataKey.FINES]: result.finances.fines,
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

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
