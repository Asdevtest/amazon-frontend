import { makeAutoObservable, runInAction } from 'mobx'

export class FreelancerNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  // onClickOrdersNotifications() {
  //   this.history.push({
  //     pathname: '/client/notifications/orders-notifications',
  //   })
  // }

  onClickFreelanceNotifications() {
    this.history.push({
      pathname: '/freelancer/notifications/freelance-notifications',
    })
  }
}
