import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

export class WarehouseManagementViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  order = undefined

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
      if (location.state) {
        this.order = location.state.order
      }
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
