import { makeAutoObservable } from 'mobx'

export class AdminSettingsViewModel {
  history = undefined

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickTechnicalBtn() {
    this.history.push('/admin/settings/technical-works')
  }
}
