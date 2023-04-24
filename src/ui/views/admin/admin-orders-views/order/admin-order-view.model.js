import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

export class AdminOrderViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  selectedSupplier = undefined
  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  showAddOrEditSupplierModal = false

  orderBoxes = []
  orderId = undefined

  drawerOpen = false
  order = undefined

  constructor({history}) {
    runInAction(() => {
      this.history = history
      this.orderId = history.location.search.slice(1)
    })
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getOrderById()
      await this.getBoxesOfOrder(this.order._id)

      const storekeepers = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        // this.destinations = await ClientModel.getDestinations()
        this.storekeepers = storekeepers
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getOrderById() {
    try {
      const result = await ClientModel.getOrderById(this.orderId)

      runInAction(() => {
        this.order = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeSelectedSupplier(supplier) {
    runInAction(() => {
      if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
        this.selectedSupplier = undefined
      } else {
        this.selectedSupplier = supplier
      }
    })
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepersData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        runInAction(() => {
          this.selectedSupplier = undefined
        })
      } else {
        const result = await UserModel.getPlatformSettings()
        await this.getStorekeepers()
        runInAction(() => {
          this.yuanToDollarRate = result.yuanToDollarRate
          this.volumeWeightCoefficient = result.volumeWeightCoefficient
        })
      }
      runInAction(() => {
        this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
      })
    } catch (error) {
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
