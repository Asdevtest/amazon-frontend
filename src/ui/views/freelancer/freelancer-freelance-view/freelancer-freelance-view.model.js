import {makeAutoObservable, runInAction} from 'mobx'

export class FreelancerFreelanceViewModel {
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

  onClickVacRequests() {
    this.history.push({
      pathname: '/freelancer/freelance/vacant-requests',
    })
  }

  onClickMyProposals() {
    this.history.push({
      pathname: '/freelancer/freelance/my-proposals',
    })
  }
}
