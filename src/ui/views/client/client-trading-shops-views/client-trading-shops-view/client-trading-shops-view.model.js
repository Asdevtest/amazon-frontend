import { makeAutoObservable, runInAction } from 'mobx'

export class ClientTradingShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickBuyShops() {
    this.history.push({
      pathname: '/client/trading-shops/buy-shops',
    })
  }

  onClickSellShops() {
    this.history.push({
      pathname: '/client/trading-shops/sell-shops',
    })
  }
}
