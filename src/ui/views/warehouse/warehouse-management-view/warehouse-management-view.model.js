import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

export class WarehouseManagementViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  order = undefined

  constructor({history, location}) {
    this.history = history
    if (location.state) {
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

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
