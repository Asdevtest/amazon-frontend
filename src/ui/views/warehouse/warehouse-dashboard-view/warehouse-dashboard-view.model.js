import {makeAutoObservable, runInAction} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {WarehouseDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {BatchesModel} from '@models/batches-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

export class WarehouseDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  dashboardData = {
    [WarehouseDashboardCardDataKey.VACANT_TASKS]: '',
    [WarehouseDashboardCardDataKey.TASKS_MY]: '',
    [WarehouseDashboardCardDataKey.COMPLETED_TASKS]: '',
    [WarehouseDashboardCardDataKey.CANCELED_TASKS]: '',
    [WarehouseDashboardCardDataKey.BOXES_IN_STORE]: '',
    [WarehouseDashboardCardDataKey.SENT_BATCHES]: '',
    [WarehouseDashboardCardDataKey.NOT_SENT_BATCHES]: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

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
      await this.getBoxesMy(id)
      await this.getBatches()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }

  async getTasksVacant() {
    try {
      const result = await StorekeeperModel.getLightTasksVacant()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [WarehouseDashboardCardDataKey.VACANT_TASKS]: result.filter(
            task => task.status === mapTaskStatusEmumToKey[TaskStatus.NEW],
          ).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getTasksMy() {
    try {
      const result = await StorekeeperModel.getLightTasksMy()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [WarehouseDashboardCardDataKey.TASKS_MY]: result.filter(
            task => task.status === mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS],
          ).length,
          [WarehouseDashboardCardDataKey.COMPLETED_TASKS]: result.filter(
            task => task.status === mapTaskStatusEmumToKey[TaskStatus.SOLVED],
          ).length,

          [WarehouseDashboardCardDataKey.CANCELED_TASKS]: result.filter(
            task => task.status === mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED],
          ).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBoxesMy() {
    try {
      const result = await StorekeeperModel.getBoxesMy()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [WarehouseDashboardCardDataKey.BOXES_IN_STORE]: result.length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBatches() {
    try {
      const result = await BatchesModel.getBatches()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [WarehouseDashboardCardDataKey.SENT_BATCHES]: result.filter(
            batch => batch.status === BatchStatus.HAS_DISPATCHED,
          ).length,
          [WarehouseDashboardCardDataKey.NOT_SENT_BATCHES]: result.filter(
            batch => batch.status === BatchStatus.IS_BEING_COLLECTED,
          ).length,
        }
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
