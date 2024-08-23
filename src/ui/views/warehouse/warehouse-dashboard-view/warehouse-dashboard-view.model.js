import { makeAutoObservable, runInAction } from 'mobx'

import { WarehouseDashboardCardDataKey } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DashboardModel } from '@models/dashboard-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

export class WarehouseDashboardViewModel {
  history = undefined
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
  warhouseButtonsRoutes = {
    notifications: '',
    messages: 'messages',
    settings: 'management',
  }

  get userInfo() {
    return UserModel.userInfo
  }
  get adress() {
    return `${t(TranslationKey['Warehouse address'])}: ${this.storekeeperDestination?.name} : ${
      this.storekeeperDestination?.zipCode
    }, ${this.storekeeperDestination?.country}, ${this.storekeeperDestination?.state}, ${
      this.storekeeperDestination?.city
    }, ${this.storekeeperDestination?.address}`
  }

  constructor(history) {
    this.history = history
    this.loadData()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    this.getDashboardElementCount()
    this.getDestinations()
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
      console.error(error)
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
      console.error(error)
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
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
