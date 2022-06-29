import {makeAutoObservable} from 'mobx'

export class ClientProductExchangeViewModel {
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
