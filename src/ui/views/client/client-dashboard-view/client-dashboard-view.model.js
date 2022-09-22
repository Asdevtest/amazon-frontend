import {makeAutoObservable, runInAction} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {BoxStatus} from '@constants/box-status'
import {ClientDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {RequestStatus} from '@constants/request-status'
import {RequestSubType, RequestType} from '@constants/request-type'
import {ShopStatus} from '@constants/shop-status'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {RequestModel} from '@models/request-model'
import {ShopSellModel} from '@models/shop-sell-model'
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
    [ClientDashboardCardDataKey.IS_BEING_COLLECTED]: '',
    [ClientDashboardCardDataKey.SEND_BOXES]: '',
    [ClientDashboardCardDataKey.PUBLISHED_STORES]: '',
    [ClientDashboardCardDataKey.ALL_REQUESTS]: '',
    [ClientDashboardCardDataKey.REQUESTS_IN_WORK]: '',
    [ClientDashboardCardDataKey.REQUESTS_WITHOUT_PROPOSAL]: '',
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
      this.getShops()
      this.getRequestsVacant()
      this.getSendedBoxes()

      this.getReadyBoxes()

      this.getWarehouseBoxes()

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

  async getShops() {
    try {
      const result = await ShopSellModel.getShopSells()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.PUBLISHED_STORES]: result.length,
          [ClientDashboardCardDataKey.MODERATING]:
            result.filter(el => el.status === ShopStatus.MODERATING).length === 0
              ? '0'
              : result.filter(el => el.status === ShopStatus.MODERATING).length,
          [ClientDashboardCardDataKey.BOOKED]:
            result.filter(el => el.status === ShopStatus.BOOKED).length === 0
              ? '0'
              : result.filter(el => el.status === ShopStatus.BOOKED).length === 0,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getRequestsVacant() {
    try {
      const result = await RequestModel.getRequests(RequestType.CUSTOM, RequestSubType.MY)

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.ALL_REQUESTS]: result.length,
          [ClientDashboardCardDataKey.REQUESTS_IN_WORK]: result.filter(el => el.status === RequestStatus.IN_PROCESS)
            .length,
          [ClientDashboardCardDataKey.REQUESTS_WITHOUT_PROPOSAL]: result.filter(
            el => el.countProposalsByStatuses.allProposals === 0,
          ).length,
        }
      })
    } catch (error) {
      console.log(error)
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

  async getBatches() {
    try {
      const batches = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.IS_BEING_COLLECTED]: batches.reduce((ac, cur) => (ac += cur.boxes.length), 0),
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getSendedBoxes() {
    try {
      const sendedBoxes = await BoxesModel.getBoxesForCurClient(BoxStatus.IN_BATCH_ON_THE_WAY)

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.SEND_BOXES]: sendedBoxes.filter(el => !el.isDraft).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getWarehouseBoxes() {
    try {
      const warehouseBoxes = await BoxesModel.getBoxesForCurClient(BoxStatus.IN_STOCK)

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE]: warehouseBoxes.filter(el => !el.isDraft).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getReadyBoxes() {
    try {
      const readyBoxes = await BoxesModel.getBoxesForCurClient(BoxStatus.REQUESTED_SEND_TO_BATCH)

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.READY_TO_SEND]: readyBoxes.filter(el => !el.isDraft).length,
        }
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickInfoCardViewMode(route, dataGridFilter) {
    if (dataGridFilter) {
      this.history.push(route, {dataGridFilter})
    } else {
      this.history.push(route)
    }
  }
}
