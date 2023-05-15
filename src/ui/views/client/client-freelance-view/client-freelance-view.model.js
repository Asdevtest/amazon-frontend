import {makeAutoObservable, runInAction} from 'mobx'

export class ClientFreelanceViewModel {
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

  onClickServiceExchange() {
    this.history.push({
      pathname: '/client/freelance/service-exchange',
    })
  }
}
