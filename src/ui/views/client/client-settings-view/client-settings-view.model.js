import {makeAutoObservable, runInAction} from 'mobx'

export class ClientSettingsViewModel {
  history = undefined
  drawerOpen = false

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
}
