import {makeAutoObservable} from 'mobx'

export class ClientSettingsViewModel {
  history = undefined
  drawerOpen = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
