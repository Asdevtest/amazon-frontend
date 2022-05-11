import {makeAutoObservable} from 'mobx'

export class ClientShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
