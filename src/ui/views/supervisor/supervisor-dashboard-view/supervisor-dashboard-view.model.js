import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {SupervisorModel} from '@models/supervisor-model'

export class SupervisorDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  productsVacant = []
  producatsMy = []
  paymentsMy = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getProducsVacant()
      this.getProducsMy()
      this.getPaymentsMy()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProducsVacant() {
    try {
      const result = await SupervisorModel.getProducsVacant()
      runInAction(() => {
        this.productsVacant = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProducsMy() {
    try {
      const result = await SupervisorModel.getProducsMy()
      runInAction(() => {
        this.producatsMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getPaymentsMy() {
    try {
      const result = await SupervisorModel.getPaymentsMy()
      runInAction(() => {
        this.paymentsMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
