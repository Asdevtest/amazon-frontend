import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {supervisorBalance} from '@constants/mocks'

import {SupervisorModel} from '@models/supervisor-model'

export class SupervisorDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  drawerOpen = false
  balance = supervisorBalance
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
      this.getBalance()
      this.getProductsVacant()
      this.getProductsMy()
      this.getPaymentsMy()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProductsVacant() {
    try {
      const result = await SupervisorModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsMy() {
    try {
      const result = await SupervisorModel.getProductsMy()
      runInAction(() => {
        this.producatsMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBalance() {
    try {
      const result = await SupervisorModel.getBalance()
      runInAction(() => {
        this.balance = result
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
