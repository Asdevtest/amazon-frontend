/* eslint-disable no-unused-vars */
import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

export class FreelancerMyRequestsViewModel {
  history = undefined
  location = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  order = undefined

  constructor({history, location}) {
    runInAction(() => {
      this.history = history
    })
    if (location.state) {
      this.location = location
      const state = {...history?.location?.state}
      delete state?.acceptMessage
      delete state?.showAcceptMessage
      history.replace({...history?.location, state})
    }

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
