import {makeAutoObservable} from 'mobx'

export class AdminBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onClickAwaitingBatches() {
    this.history.push({
      pathname: '/admin/batches/awaiting-batches',
    })
  }

  onClickSentBatches() {
    this.history.push({
      pathname: '/admin/batches/sent-batches',
    })
  }
}
