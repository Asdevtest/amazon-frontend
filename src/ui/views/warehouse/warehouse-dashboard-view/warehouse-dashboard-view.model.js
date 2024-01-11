import { makeAutoObservable, runInAction } from 'mobx'

import { WarehouseDashboardCardDataKey } from '@constants/navigation/dashboard-configs'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { ClientModel } from '@models/client-model'
import { DashboardModel } from '@models/dashboard-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

export class WarehouseDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  showAddOrEditDestinationModal = false

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

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      this.getDashboardElementCount()

      this.getDestinations()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async getDestinations() {
    try {
      const result = await ClientModel.getDestinations()

      const storekeeperDestination = result.find(
        el =>
          el.storekeeper?._id === this.userInfo._id ||
          (el.storekeeper?._id === this.userInfo.masterUser?._id && el.storekeeper),
      )
      if (storekeeperDestination) {
        runInAction(() => {
          this.storekeeperDestination = storekeeperDestination
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  onClickAddressBtn() {
    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  async onSubmitChangeDestination(data) {
    try {
      await StorekeeperModel.editStorekeperDestination(data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')
      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }

  async getDashboardElementCount() {
    try {
      const result = await DashboardModel.getStorekeeperDashboadItems()
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
      runInAction(() => {
        this.error = error
      })
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
