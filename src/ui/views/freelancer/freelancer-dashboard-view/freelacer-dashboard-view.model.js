import { makeAutoObservable, runInAction } from 'mobx'

import { FreelancerDashboardCardDataKey } from '@constants/navigation/dashboard-configs'

import { DashboardModel } from '@models/dashboard-model'
import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'

export class FreelancerDashboardViewModel {
  history = undefined
  requestStatus = undefined

  balance = UserModel.userInfo?.balance
  productsVacant = []
  paymentsMy = []

  get userInfo() {
    return UserModel.userInfo
  }

  dashboardData = {
    [FreelancerDashboardCardDataKey.REPLENISH]: '',
    [FreelancerDashboardCardDataKey.FINES]: '',
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickInfoCardViewMode(route, dataGridFilter) {
    if (dataGridFilter) {
      this.history.push(route, { dataGridFilter })
    } else {
      this.history.push(route)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDashboardElementCount()
      await this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.log(error)
    }
  }

  async getDashboardElementCount() {
    try {
      const result = await DashboardModel.getFreelancerDashboadItems()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [FreelancerDashboardCardDataKey.REPLENISH]: result.finances.accruals,
          [FreelancerDashboardCardDataKey.FINES]: result.finances.fines,
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
