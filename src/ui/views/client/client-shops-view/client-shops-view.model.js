import { makeAutoObservable } from 'mobx'

export class ClientShopsViewModel {
  history = undefined
  requestStatus = undefined

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
