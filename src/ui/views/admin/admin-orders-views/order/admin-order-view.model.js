import { makeAutoObservable, runInAction } from 'mobx'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminOrderViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  orderBoxes = []
  orderId = undefined

  storekeepers = []
  destinations = []

  order = undefined

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ history }) {
    const url = new URL(window.location.href)

    this.history = history
    this.orderId = url.searchParams.get('orderId')

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      this.getOrderById()
      this.getBoxesOfOrder(this.orderId)

      const [storekeepers, destinations] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
      ])

      runInAction(() => {
        this.destinations = destinations
        this.storekeepers = storekeepers
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getOrderById() {
    try {
      const result = await ClientModel.getOrderById(this.orderId)

      runInAction(() => {
        SettingsModel.changeLastCrumbAdditionalText(` № ${result.id}`)

        this.order = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepersData = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getBoxesOfOrder(orderId) {
    try {
      const result = await BoxesModel.getBoxesOfOrder(orderId)

      runInAction(() => {
        this.orderBoxes = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
