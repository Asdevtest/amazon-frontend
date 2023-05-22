import { makeAutoObservable, runInAction } from 'mobx'

export class ClientWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickInStock() {
    this.history.push({
      pathname: '/client/warehouse/in-stock',
    })
  }

  onClickReadyToBatch() {
    this.history.push({
      pathname: '/client/warehouse/boxes-ready-to-batch',
    })
  }
}
