import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

export class AdminUserPermissionsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  order = undefined

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
    })
    if (location.state) {
      runInAction(() => {
        this.order = location.state.order
      })
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
