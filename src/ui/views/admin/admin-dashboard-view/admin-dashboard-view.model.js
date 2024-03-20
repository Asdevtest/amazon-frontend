import { makeAutoObservable, runInAction } from 'mobx'

import { AdminDashboardCardDataKey } from '@constants/navigation/dashboard-configs'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

// import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

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
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
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
