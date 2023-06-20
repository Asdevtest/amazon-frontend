import { makeAutoObservable, runInAction } from 'mobx'

export class ClientNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
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

  onClickIdeasNotifications() {
    this.history.push({
      pathname: '/client/notifications/ideas-notifications',
    })
  }

  onClickFreelanceNotifications() {
    this.history.push({
      pathname: '/client/notifications/freelance-notifications',
    })
  }
}
