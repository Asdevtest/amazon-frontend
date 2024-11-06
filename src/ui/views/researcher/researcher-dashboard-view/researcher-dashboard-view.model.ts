import { makeAutoObservable, runInAction } from 'mobx'

import { ResearcherDashboardCardDataKey } from '@constants/navigation/dashboard-configs'

import { DashboardModel } from '@models/dashboard-model'
import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class ResearcherDashboardViewModel {
  history?: HistoryType
  dashboardData: any = {
    [ResearcherDashboardCardDataKey.ALL_PRODUCTS]: '',
    [ResearcherDashboardCardDataKey.REJECTED_PRODUCTS]: '',
    [ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING]: '',
  }

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor(history: HistoryType) {
    this.history = history
    this.getDashboardElementCount()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getDashboardElementCount() {
    try {
      const result = await DashboardModel.getResearcherDashboadItems()

      runInAction(() => {
        this.dashboardData = {
          [ResearcherDashboardCardDataKey.ALL_PRODUCTS]: result?.products?.all,
          [ResearcherDashboardCardDataKey.REJECTED_PRODUCTS]: result?.products?.rejected,
          [ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING]: result?.products?.inWork,
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickInfoCardViewMode(route: string, dataGridFilter: any) {
    if (dataGridFilter) {
      this.history?.push(route, { dataGridFilter })
    } else {
      this.history?.push(route)
    }
  }
}
