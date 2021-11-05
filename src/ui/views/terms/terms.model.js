import {makeAutoObservable} from 'mobx'

export class TermsViewModel {
  history = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }
}
