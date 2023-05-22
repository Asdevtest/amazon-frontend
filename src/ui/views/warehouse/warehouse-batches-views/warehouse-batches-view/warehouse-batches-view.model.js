import { makeAutoObservable, runInAction } from 'mobx'

export class WarehouseBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickAwaitingBatches() {
    this.history.push({
      pathname: '/warehouse/batches/awaiting-batches',
    })
  }

  onClickSentBatches() {
    this.history.push({
      pathname: '/warehouse/batches/sent-batches',
    })
  }
}
