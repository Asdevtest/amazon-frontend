import { makeAutoObservable } from 'mobx'

export class ClientMyOrdersViewModel {
  history = undefined

  constructor({ history }) {
    this.history = history

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
