import {makeAutoObservable, runInAction} from 'mobx'

export class SupervisorFreelanceViewModel {
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
