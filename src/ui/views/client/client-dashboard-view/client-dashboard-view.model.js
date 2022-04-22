import {makeAutoObservable, runInAction} from 'mobx'

import {ClientDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {UserModel} from '@models/user-model'

export class ClientDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  dashboardData = {
    [ClientDashboardCardDataKey.IN_INVENTORY]: '',
    [ClientDashboardCardDataKey.REPURCHASE_ITEMS]: '',
    [ClientDashboardCardDataKey.ALL_ORDERS]: '',
    [ClientDashboardCardDataKey.PAID_ORDERS]: '',
    [ClientDashboardCardDataKey.CANCELED_ORDERS]: '',
    [ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE]: '',
    [ClientDashboardCardDataKey.READY_TO_SEND]: '',
    [ClientDashboardCardDataKey.SEND_BOXES]: '',
  }

  showTransferModal = false

  transferModalSettings = {
    isWithdraw: false,
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickAddMoney() {
    this.transferModalSettings.isWithdraw = false
    this.onTriggerOpenModal('showTransferModal')
  }

  onClickWithdrawMoney() {
    this.transferModalSettings.isWithdraw = true
    this.onTriggerOpenModal('showTransferModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onChangeCategory(index) {
    this.activeCategory = index
  }

  onChangeSubCategory(index) {
    this.activeSubCategory = index
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getProductsMy()
      this.getOrders()

      this.getBoxesMy()

      this.getBatches()

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getOrders() {
    try {
      const result = await ClientModel.getOrders()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.ALL_ORDERS]: result.length,
          [ClientDashboardCardDataKey.PAID_ORDERS]: result.filter(el =>
            [
              OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
              OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
              OrderStatusByKey[OrderStatus.IN_STOCK],
            ].includes(el.status),
          ).length,
          [ClientDashboardCardDataKey.CANCELED_ORDERS]: result.filter(
            el =>
              el.status === OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER] ||
              el.status === OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT],
          ).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getProductsMy() {
    try {
      const result = await ClientModel.getProductsMy()
      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.IN_INVENTORY]: result.length,
          [ClientDashboardCardDataKey.REPURCHASE_ITEMS]: result.filter(el => el.paidAt).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxesForCurClient()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE]: result.filter(el => !el.isDraft).length,
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

      const batchesBoxes = result.reduce((ac, cur) => ac.concat(cur.boxes), [])

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.READY_TO_SEND]: batchesBoxes.filter(el => !el.sendToBatchComplete).length,
          [ClientDashboardCardDataKey.SEND_BOXES]: batchesBoxes.filter(el => el.sendToBatchComplete).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickInfoCardViewMode(route) {
    this.history.push(route)
  }
}
