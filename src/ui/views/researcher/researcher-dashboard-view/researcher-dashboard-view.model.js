import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ResearcherModel} from '@models/researcher-model'
import {UserModel} from '@models/user-model'

export class ResearcherDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  productsVacant = []
  paymentsMy = []

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
      await this.getProductsVacant()
      await this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }

  async getProductsVacant() {
    const result = await ResearcherModel.getProductsVacant()
    runInAction(() => {
      this.productsVacant = result
    })
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
