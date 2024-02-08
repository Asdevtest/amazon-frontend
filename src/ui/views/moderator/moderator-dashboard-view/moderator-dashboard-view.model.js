import { makeAutoObservable, runInAction } from 'mobx'

// import {FreelancerDashboardCardDataKey} from '@constants/dashboard-configs'
// import {loadingStatuses} from '@constants/loading-statuses'
// import {OtherModel} from '@models/other-model'
// import {ResearcherModel} from '@models/researcher-model'
import { UserModel } from '@models/user-model'

// import {toFixed} from '@utils/text'

export class ModeratorDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  // balance = UserModel.userInfo?.balance
  // productsVacant = []
  // paymentsMy = []

  get userInfo() {
    return UserModel.userInfo
  }

  // dashboardData = {
  //   [FreelancerDashboardCardDataKey.REPLENISH]: '',
  //   [FreelancerDashboardCardDataKey.FINES]: '',
  // }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  // onClickInfoCardViewMode(route) {
  //   this.history.push(route)
  // }

  // async getPayments() {
  //   try {
  //     const result = await OtherModel.getMyPayments()

  //     runInAction(() => {
  //       this.dashboardData = {
  //         ...this.dashboardData,
  //         [FreelancerDashboardCardDataKey.REPLENISH]: toFixed(
  //           result.filter(el => el.sum > 0).reduce((ac, cur) => (ac += cur.sum), 0),
  //           2,
  //         ),
  //         [FreelancerDashboardCardDataKey.FINES]: toFixed(
  //           result.filter(el => el.paymentType === 'FINE').reduce((ac, cur) => (ac += cur.sum), 0),
  //           2,
  //         ),
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     this.error = error
  //   }
  // }

  // async loadData() {
  //   try {
  //     this.setRequestStatus(loadingStatuses.IS_LOADING)
  //     await this.getPayments()
  //     await this.setRequestStatus(loadingStatuses.SUCCESS)
  //   } catch (error) {
  //     this.setRequestStatus(loadingStatuses.FAILED)
  //     console.log(error)
  //   }
  // }

  // async getProductsVacant() {
  //   const result = await ResearcherModel.getProductsVacant()
  //   runInAction(() => {
  //     this.productsVacant = result
  //   })
  // }

  // setRequestStatus(requestStatus) {
  //   this.requestStatus = requestStatus
  // }
}
