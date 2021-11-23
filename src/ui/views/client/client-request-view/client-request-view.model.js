import {makeAutoObservable} from 'mobx'

export class ClientRequestViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  request = undefined

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.request = location.state.request
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
