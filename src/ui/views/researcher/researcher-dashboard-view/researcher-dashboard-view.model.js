import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {researcherBalance} from '@constants/mocks'

import {ResearcherModel} from '@models/researcher-model'

export class ResearcherDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  balance = researcherBalance
  drawerOpen = false
  productsVacant = []
  paymentsMy = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getBalance()
      await this.getProductsVacant()
      await this.getPaymentsMy()
      await this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getBalance() {
    try {
      const result = await ResearcherModel.getBalance()
      runInAction(() => {
        this.balance = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsVacant() {
    const result = await ResearcherModel.getProductsVacant()
    runInAction(() => {
      this.productsVacant = result
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
