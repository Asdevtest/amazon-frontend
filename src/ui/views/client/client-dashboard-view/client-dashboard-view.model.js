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

  showTransferModal = false

  transferModalSettings = {
    isWithdraw: false,
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickAddMoney() {
    this.transferModalSettings.isWithdraw = false
    this.onTriggerOpenModal('showTransferModal')
  }

  onClickWithdrawMoney() {
    this.transferModalSettings.isWithdraw = true
    this.onTriggerOpenModal('showTransferModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
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
      await this.getProductsPaid()
      await this.getOrders()

      await this.getBoxesMy()

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
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

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }
}
