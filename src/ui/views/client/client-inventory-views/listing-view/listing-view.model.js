import {makeAutoObservable} from 'mobx'

export class ClientListingViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  product = {}

  drawerOpen = false
  orderBase = undefined
  order = undefined

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.product = location.state.product
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
