import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

export class ClientOrderViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  orderBase = undefined
  order = undefined

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.orderBase = location.state.order
      this.order = location.state.order
    }
    makeAutoObservable(this, undefined, {autoBind: true})
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

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
