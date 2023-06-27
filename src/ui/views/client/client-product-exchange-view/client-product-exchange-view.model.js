import { makeAutoObservable, runInAction } from 'mobx'

export class ClientProductExchangeViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickForksExchange() {
    this.history.push({
      pathname: '/client/product-exchange/forks-exchange',
    })
  }

  onClickPrivateLabel() {
    this.history.push({
      pathname: '/client/product-exchange/private-label',
    })
  }
}
