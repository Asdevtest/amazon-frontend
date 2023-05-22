import { makeAutoObservable, runInAction } from 'mobx'

export class SupervisorFreelanceViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
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
