import {makeAutoObservable, runInAction} from 'mobx'

import {WarehouseDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'
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
    [WarehouseDashboardCardDataKey.REQUESTED_SEND_TO_BATCH]: '',
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

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getDashboardElementCount()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }

  async getDashboardElementCount() {
    try {
      const result = await ClientModel.getDashboardStorekeeperElementCount()
      console.log(result)
      runInAction(() => {
        this.dashboardData = {
          [WarehouseDashboardCardDataKey.VACANT_TASKS]: result.tasks.vacant,
          [WarehouseDashboardCardDataKey.TASKS_MY]: result.tasks.my,
          [WarehouseDashboardCardDataKey.COMPLETED_TASKS]: result.tasks.completed,
          [WarehouseDashboardCardDataKey.CANCELED_TASKS]: result.tasks.canceled,
          [WarehouseDashboardCardDataKey.BOXES_IN_STORE]: result.boxes.all,
          [WarehouseDashboardCardDataKey.SENT_BATCHES]: result.batches.sent,
          [WarehouseDashboardCardDataKey.NOT_SENT_BATCHES]: result.batches.awaitingSend,
          [WarehouseDashboardCardDataKey.REQUESTED_SEND_TO_BATCH]: result.boxes.requestedShipment,
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
