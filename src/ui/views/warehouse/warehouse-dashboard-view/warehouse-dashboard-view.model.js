import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

export class WarehouseDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  balance = UserModel.userInfo?.balance
  tasksVacant = []
  tasksMy = []
  boxesVacant = []
  boxesMy = []
  batches = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  async loadData(id) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getTasksVacant()
      await this.getTasksMy()
      await this.getBoxesVacant()
      await this.getBoxesMy(id)
      await this.getBatches()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getTasksVacant() {
    try {
      const result = await StorekeeperModel.getTasksVacant()
      runInAction(() => {
        this.tasksVacant = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getTasksMy() {
    try {
      const result = await StorekeeperModel.getTasksMy()
      runInAction(() => {
        this.tasksMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBoxesVacant() {
    try {
      const result = await StorekeeperModel.getBoxesVacant()
      runInAction(() => {
        this.boxesVacant = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBoxesMy(id) {
    try {
      const result = await StorekeeperModel.getBoxesMy(id)
      runInAction(() => {
        this.boxesMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
  async getBatches() {
    try {
      const result = await StorekeeperModel.getBatches()
      runInAction(() => {
        this.batches = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
