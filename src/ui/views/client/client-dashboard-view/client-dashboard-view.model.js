import {makeAutoObservable, runInAction} from 'mobx'

import {ClientDashboardCardDataKey} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'

import {DashboardModel} from '@models/dashboard-model'
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

      this.getElementCount()

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getElementCount() {
    try {
      const result = await DashboardModel.getClientDashboadItems()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.IN_INVENTORY]: result.products.all || '0',
          [ClientDashboardCardDataKey.REPURCHASE_ITEMS]: result.products.paid || '0',
          [ClientDashboardCardDataKey.PUBLISHED_STORES]: result.shops.all || '0',
          [ClientDashboardCardDataKey.MODERATING]: result.shops.moderating || '0',
          [ClientDashboardCardDataKey.BOOKED]: result.shops.booked || '0',
          [ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE]: result.boxes.inStock || '0',
          [ClientDashboardCardDataKey.IS_BEING_COLLECTED]: result.batch.isBeingCollected || '0',
          [ClientDashboardCardDataKey.READY_TO_SEND]: result.boxes.requestedSendToBatch || '0',
          [ClientDashboardCardDataKey.SEND_BOXES]: result.boxes.inBatchOnTheWay || '0',
          [ClientDashboardCardDataKey.ALL_REQUESTS]: result.requests.all || '0',
          [ClientDashboardCardDataKey.REQUESTS_IN_WORK]: result.requests.inProcess || '0',
          [ClientDashboardCardDataKey.REQUESTS_WITHOUT_PROPOSAL]: result.requests.noProposals || '0',
          [ClientDashboardCardDataKey.ALL_ORDERS]: result.orders.all || '0',
          [ClientDashboardCardDataKey.PAID_ORDERS]: result.orders.paid || '0',
          [ClientDashboardCardDataKey.CANCELED_ORDERS]: result.orders.canceled || '0',
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

  onClickAddProduct(route) {
    this.history.push(route, {isModalOpen: true})
  }
}
