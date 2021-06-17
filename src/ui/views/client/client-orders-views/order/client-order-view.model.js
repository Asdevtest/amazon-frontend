import {makeAutoObservable} from 'mobx'

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
      console.log(location.state.order)
      this.orderBase = location.state.order
      this.order = location.state.order
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }
}
