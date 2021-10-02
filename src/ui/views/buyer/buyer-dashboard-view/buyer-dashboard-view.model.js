import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BuyerModel} from '@models/buyer-model'
import {UserModel} from '@models/user-model'

export class BuyerDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  drawerOpen = false
  balance = UserModel.userInfo?.balance

  productsVacant = []
  productsMy = []
  ordersMy = []
  ordersVacant = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getProductsVacant()
      this.getProductsMy()
      this.getOrdersMy()
      this.getOrdersVacant()

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
      const result = await BuyerModel.getProductsVacant()
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
      const result = await BuyerModel.getProductsMy()
      runInAction(() => {
        this.productsMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getOrdersMy() {
    try {
      const result = await BuyerModel.getOrdersMy()
      runInAction(() => {
        this.ordersMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getOrdersVacant() {
    try {
      const result = await BuyerModel.getOrdersVacant()
      runInAction(() => {
        this.ordersVacant = result
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
