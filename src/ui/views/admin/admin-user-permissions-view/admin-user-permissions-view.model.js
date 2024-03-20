import { makeAutoObservable } from 'mobx'

export class AdminUserPermissionsViewModel {
  history = undefined

  order = undefined

  constructor({ history }) {
    this.history = history

    if (history?.location?.state) {
      this.order = history.location.state.order
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
