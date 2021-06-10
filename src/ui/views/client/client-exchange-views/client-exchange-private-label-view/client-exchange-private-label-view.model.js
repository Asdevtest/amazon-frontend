import {makeAutoObservable} from 'mobx'

export class ClientExchangePrivateLabelViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }
}
