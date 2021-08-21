import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'

export class AdminUserBalanceViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  userId = undefined
  user = {}
  payments = []

  drawerOpen = false
  showReplenishModal = false
  showWithdrawModal = false

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.userId = location.state.user.id
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getUserInfo(this.userId)
      await this.getBalanceHistory(this.userId)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onTriggerReplenishModal() {
    this.showReplenishModal = !this.showReplenishModal
  }

  onTriggerWithdrawModal() {
    this.showWithdrawModal = !this.showWithdrawModal
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getBalanceHistory(id) {
    try {
      const result = await AdministratorModel.getPaymentsById(id)

      runInAction(() => {
        this.payments = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getUserInfo(id) {
    try {
      const result = await AdministratorModel.getUsersById(id)

      runInAction(() => {
        this.user = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async makePayment(data) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined

      await AdministratorModel.makePayment(data)

      await this.getUserInfo(data.recipient)

      await this.getBalanceHistory(data.recipient)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }
}
