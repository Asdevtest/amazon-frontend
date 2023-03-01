import {makeAutoObservable, runInAction} from 'mobx'

export class BuyerNotificationsViewModel {
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

  // onClickOrdersNotifications() {
  //   this.history.push({
  //     pathname: '/client/notifications/orders-notifications',
  //   })
  // }

  onClickIdeasNotifications() {
    this.history.push({
      pathname: '/buyer/notifications/ideas-notifications',
    })
  }
}
