import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'

export class AdminUserViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  userId = undefined
  user = {}

  drawerOpen = false
  order = undefined

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.userId = location.state.user._id
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getUserInfo(id) {
    try {
      const result = await AdministratorModel.getUsersById(id)

      runInAction(() => {
        this.user = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getUserInfo(this.userId)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
