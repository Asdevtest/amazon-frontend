import {makeAutoObservable} from 'mobx'

export class ClientShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  openModal = null

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.openModal = location.state.openModal
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
