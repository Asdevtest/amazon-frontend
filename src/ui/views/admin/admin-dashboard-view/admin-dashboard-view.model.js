import {makeAutoObservable, runInAction} from 'mobx'

import {AdminDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'
import {UserModel} from '@models/user-model'

export class AdminDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  dashboardData = {
    [AdminDashboardCardDataKey.EXCHANGE_WAITING_TO_CHECK]: '',
    [AdminDashboardCardDataKey.EXCHANGE_BEING_CHECKED]: '',
    [AdminDashboardCardDataKey.EXCHANGE_CHECKED]: '',
    [AdminDashboardCardDataKey.EXCHANGE_REJECTED]: '',
    [AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_RESEARCHERS]: '',
    [AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_SUPERVISORS]: '',
    [AdminDashboardCardDataKey.FINANCES_SUPERVISORS_FINES]: '',
    [AdminDashboardCardDataKey.FINANCES_RESEARCHERS_FINES]: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProductsWaiting()
      this.getProductsChecking()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsWaiting() {
    try {
      const result = await AdministratorModel.getProductsWaiting()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [AdminDashboardCardDataKey.EXCHANGE_WAITING_TO_CHECK]: result.length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsChecking() {
    try {
      const result = await AdministratorModel.getProductsChecking()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [AdminDashboardCardDataKey.EXCHANGE_BEING_CHECKED]: result.length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }
}
