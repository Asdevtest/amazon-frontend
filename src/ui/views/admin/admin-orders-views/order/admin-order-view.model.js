import { makeAutoObservable, runInAction } from 'mobx'

import { ClientModel } from '@models/client-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

export class AdminOrderViewModel {
  history = undefined
  requestStatus = undefined

  orderId = ''
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
      this.getOrderById()
      this.getStorekeepers()
      this.getDestinations()
    } catch (error) {
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
      const response = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getDestinations() {
    try {
      const response = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = response
      })
    } catch (error) {
      console.error(error)
    }
  }
}
