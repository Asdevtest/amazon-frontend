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

  onClickMyRequests() {
    this.history.push({
      pathname: '/client/freelance/my-requests',
    })
  }

  onClickVacRequests() {
    this.history.push({
      pathname: '/client/freelance/vacant-requests',
    })
  }

  onClickMyProposals() {
    this.history.push({
      pathname: '/client/freelance/my-proposals',
    })
  }
}
