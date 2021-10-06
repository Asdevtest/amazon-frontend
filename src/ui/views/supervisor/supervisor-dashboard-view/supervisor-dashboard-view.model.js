import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {OtherModel} from '@models/other-model'
import {SupervisorModel} from '@models/supervisor-model'
import {UserModel} from '@models/user-model'

export class SupervisorDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  drawerOpen = false
  balance = UserModel.userInfo?.balance
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

      this.getProductsVacant()
      this.getProductsMy()
      this.getPaymentsMy()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }

  async getProductsVacant() {
    try {
      const result = await SupervisorModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = result.filter(el => el.icomment !== '')
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

  async getPaymentsMy() {
    try {
      const result = await OtherModel.getMyPayments()
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
