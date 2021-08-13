import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'

export class ClientOrderViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  orderBoxes = []

  drawerOpen = false
  orderBase = undefined
  order = undefined

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.orderBase = location.state.order
      this.order = location.state.order
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getBoxesOfOrder(this.order._id)
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getBoxesOfOrder(orderId) {
    try {
      const result = await BoxesModel.getBoxesOfOrder(orderId)
      runInAction(() => {
        this.orderBoxes = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
