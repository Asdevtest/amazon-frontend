import { makeAutoObservable, runInAction } from 'mobx'

export class ClientMyOrdersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickOrders() {
    this.history.push({
      pathname: '/client/my-orders/orders',
    })
  }

  onClickPendingOrders() {
    this.history.push({
      pathname: '/client/my-orders/pending-orders',
    })
  }
}
