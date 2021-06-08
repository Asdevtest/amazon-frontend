import {makeAutoObservable} from 'mobx'

export class ClientOrdersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }
}
