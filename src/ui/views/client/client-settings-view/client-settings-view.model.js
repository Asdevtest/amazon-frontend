import { makeAutoObservable, runInAction } from 'mobx'

export class ClientSettingsViewModel {
  history = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
