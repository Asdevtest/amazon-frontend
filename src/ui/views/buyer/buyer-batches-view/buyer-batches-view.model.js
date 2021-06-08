import {makeAutoObservable} from 'mobx'

export class BuyerBatchesViewModel {
  history = undefined
  requestStatus = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }
}
