import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'

export class AdminDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  productsWaitingToChek = []
  productsOnCheking = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getProductsWaiting()
      this.getProductsChecking()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsWaiting() {
    try {
      const result = await AdministratorModel.getProductsWaiting()
      runInAction(() => {
        this.productsWaitingToChek = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsChecking() {
    try {
      const result = await AdministratorModel.getProductsChecking()
      runInAction(() => {
        this.productsOnCheking = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
