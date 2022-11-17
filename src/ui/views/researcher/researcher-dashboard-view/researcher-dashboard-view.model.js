import {makeAutoObservable, runInAction} from 'mobx'

import {ResearcherDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'

import {DashboardModel} from '@models/dashboard-model'
import {UserModel} from '@models/user-model'

export class ResearcherDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
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

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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

          [ResearcherDashboardCardDataKey.ALL_PRODUCTS]: result.products.all || '0',
          [ResearcherDashboardCardDataKey.SUCCESS_PRODUCTS]: result.products.completed || '0',

          [ResearcherDashboardCardDataKey.REJECTED_PRODUCTS]: result.products.rejected || '0',
          [ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING]: result.products.inWork || '0',
          [ResearcherDashboardCardDataKey.ON_SUPPLIER_SEEKING_BY_BUYER]: result.products.searchSupplierFromBuyer || '0',
          [ResearcherDashboardCardDataKey.NO_STATUS]: result.products.withoutStatus || '0',

          [ResearcherDashboardCardDataKey.REPLENISH]: result.finances.accruals || '0',
          [ResearcherDashboardCardDataKey.FINES]: result.finances.fines || '0',
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickInfoCardViewMode(route, dataGridFilter) {
    if (dataGridFilter) {
      this.history.push(route, {dataGridFilter})
    } else {
      this.history.push(route)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
