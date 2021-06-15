import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ResearcherModel} from '@models/researcher-model'

export class ResearcherDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  products = []
  paymentsMy = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getProducts()
      await this.getPaymentsMy()
      await this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProducts() {
    const result = await ResearcherModel.getProducts()
    runInAction(() => {
      this.products = result
    })
  }

  async getPaymentsMy() {
    const result = await ResearcherModel.getPaymentsMy()
    runInAction(() => {
      this.paymentsMy = result
    })
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
