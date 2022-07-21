import {makeAutoObservable} from 'mobx'

export class ClientTradingShopsViewModel {
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
