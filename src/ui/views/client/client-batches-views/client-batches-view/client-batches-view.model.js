import {makeAutoObservable, runInAction} from 'mobx'

export class ClientBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onClickBoxesReadyToSend() {
    this.history.push({
      pathname: '/client/batches/boxes-ready-to-batch',
    })
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
