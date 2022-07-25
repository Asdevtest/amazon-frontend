import {makeAutoObservable} from 'mobx'

export class SupervisorFreelanceViewModel {
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

  onClickVacantDeals() {
    this.history.push({
      pathname: '/supervisor/freelance/vacant-deals',
    })
  }

  onClickDealsOnReview() {
    this.history.push({
      pathname: '/supervisor/freelance/deals-on-review',
    })
  }
}
