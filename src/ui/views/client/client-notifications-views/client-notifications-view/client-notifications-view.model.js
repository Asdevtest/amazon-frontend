import {makeAutoObservable} from 'mobx'

export class ClientNotificationsViewModel {
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

  onClickOrdersNotifications() {
    this.history.push({
      pathname: '/client/notifications/orders-notifications',
    })
  }

  onClickBoxesNotifications() {
    this.history.push({
      pathname: '/client/notifications/boxes-notifications',
    })
  }

  onClickTariffsNotifications() {
    this.history.push({
      pathname: '/client/notifications/tariffs-notifications',
    })
  }
}
