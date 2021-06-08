import {makeAutoObservable} from 'mobx'

export class ClientDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }
}
