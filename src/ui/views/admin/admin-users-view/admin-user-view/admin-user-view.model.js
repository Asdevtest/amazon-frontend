import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'

export class AdminUserViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  userId = undefined
  user = undefined

  drawerOpen = false
  order = undefined

  constructor({history, location}) {
    runInAction(() => {
      this.history = history
    })

    if (location.state) {
      runInAction(() => {
        this.user = location.state.user
      })
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
      // await this.getUserInfo(this.userId)

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
