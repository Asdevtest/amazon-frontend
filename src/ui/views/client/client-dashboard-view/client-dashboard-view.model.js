import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {UserModel} from '@models/user-model'

export class ClientDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  balance = UserModel.userInfo?.balance
  drawerOpen = false
  productsMy = []
  boxesMy = []
  orders = []
  productsPaid = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeCategory(index) {
    this.activeCategory = index
  }

  onChangeSubCategory(index) {
    this.activeSubCategory = index
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await this.getProductsMy()
      await this.getBoxesMy()
      await this.getOrders()
      await this.getProductsPaid()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getProductsMy() {
    try {
      const result = await ClientModel.getProductsMy()
      runInAction(() => {
        this.productsMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxes()
      runInAction(() => {
        this.boxesMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getOrders() {
    try {
      const result = await ClientModel.getOrders()
      runInAction(() => {
        this.orders = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsPaid() {
    try {
      const result = await ClientModel.getProductsPaid()
      runInAction(() => {
        this.productsPaid = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
