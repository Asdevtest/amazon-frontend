import { makeAutoObservable } from 'mobx'

export class AdminUserViewModel {
  history = undefined

  user = undefined

  constructor({ history }) {
    this.history = history

    if (history?.location?.state) {
      this.user = history.location.state.user
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
