import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
// import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'

export class ClientOrderViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  orderId = undefined
  orderBoxes = []

  volumeWeightCoefficient = undefined

  drawerOpen = false
  order = undefined

  showConfirmModal = false

  constructor({history}) {
    this.history = history

    this.orderId = history.location.search.slice(1)

    makeAutoObservable(this, undefined, {autoBind: true})

    // reaction(
    //   () => SettingsModel.languageTag,
    //   () => this.loadData(),
    // )
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getOrderById()
      await this.getBoxesOfOrder(this.orderId)
      await this.getVolumeWeightCoefficient()

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

  async getVolumeWeightCoefficient() {
    try {
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getBoxesOfOrder(orderId) {
    try {
      const result = await BoxesModel.getBoxesOfOrder(orderId)
      runInAction(() => {
        this.orderBoxes = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickCancelOrder() {
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitCancelOrder() {
    try {
      await ClientModel.cancelOrder(this.order._id)

      this.onTriggerOpenModal('showConfirmModal')

      this.history.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
