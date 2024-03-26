import { makeAutoObservable, runInAction } from 'mobx'

import { AdminDashboardCardDataKey } from '@constants/navigation/dashboard-configs'

// import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

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

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }
}
