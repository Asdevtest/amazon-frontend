import { makeAutoObservable } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

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
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.error(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
