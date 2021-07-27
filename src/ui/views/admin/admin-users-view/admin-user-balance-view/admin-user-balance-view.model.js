import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'

export class AdminUserBalanceViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  user = undefined

  drawerOpen = false
  showReplenishModal = false
  showWithdrawModal = false

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      const user = {
        ...location.state.user,
      }
      this.user = user
    }
    makeAutoObservable(this, undefined, {autoBind: true})
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

  async getBalanceHistory() {}

  async makePayment(data) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined

      await AdministratorModel.makePayment(data)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }
}
