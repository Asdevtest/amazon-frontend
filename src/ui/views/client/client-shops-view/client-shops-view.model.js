import {makeAutoObservable, runInAction} from 'mobx'

export class ClientShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  openModal = null

  constructor({history, location}) {
    runInAction(() => {
      this.history = history
      if (location.state) {
        this.openModal = location.state.openModal
      }
    })
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
}
