import { makeAutoObservable } from 'mobx'

import { loadingStatus } from '@typings/enums/loading-status'

export class WarehouseManagementViewModel {
  history = undefined
  requestStatus = undefined

  order = undefined

  constructor({ history }) {
    this.history = history

    if (history.location.state) {
      this.order = history.location.state.order
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
