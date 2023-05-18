import { makeAutoObservable, runInAction } from 'mobx'

export class ClientBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickAwaitingSend() {
    this.history.push({
      pathname: '/client/batches/awaiting-batch',
    })
  }

  onClickSentBatches() {
    this.history.push({
      pathname: '/client/batches/sent-batches',
    })
  }
}
