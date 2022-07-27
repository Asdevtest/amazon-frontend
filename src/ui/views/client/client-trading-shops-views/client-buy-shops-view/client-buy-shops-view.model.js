import {makeAutoObservable} from 'mobx'

export class ClientSellShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
