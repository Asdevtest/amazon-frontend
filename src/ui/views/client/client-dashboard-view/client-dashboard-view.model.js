import { makeAutoObservable, runInAction } from 'mobx'

import { ClientDashboardCardDataKey } from '@constants/navigation/dashboard-configs'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DashboardModel } from '@models/dashboard-model'
import { UserModel } from '@models/user-model'

export class ClientDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

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

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickAddMoney() {
    runInAction(() => {
      this.transferModalSettings.isWithdraw = false
    })
    this.onTriggerOpenModal('showTransferModal')
  }

  onClickWithdrawMoney() {
    runInAction(() => {
      this.transferModalSettings.isWithdraw = true
    })
    this.onTriggerOpenModal('showTransferModal')
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onChangeCategory(index) {
    runInAction(() => {
      this.activeCategory = index
    })
  }

  onChangeSubCategory(index) {
    runInAction(() => {
      this.activeSubCategory = index
    })
  }

  async loadData() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatuses.isLoading
      })

      this.getElementCount()

      runInAction(() => {
        this.requestStatus = loadingStatuses.success
      })
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatuses.failed
      })
      console.log(error)
    }
  }

  async getElementCount() {
    try {
      const result = await DashboardModel.getClientDashboadItems()

      runInAction(() => {
        this.dashboardData = {
          ...this.dashboardData,
          [ClientDashboardCardDataKey.IN_INVENTORY]: result.products.all,
          [ClientDashboardCardDataKey.REPURCHASE_ITEMS]: result.products.paid,
          [ClientDashboardCardDataKey.PUBLISHED_STORES]: result.shops.all,
          [ClientDashboardCardDataKey.MODERATING]: result.shops.moderating,
          [ClientDashboardCardDataKey.BOOKED]: result.shops.booked,
          [ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE]: result.boxes.inStock,
          [ClientDashboardCardDataKey.IS_BEING_COLLECTED]: result.batch.isBeingCollected,
          [ClientDashboardCardDataKey.READY_TO_SEND]: result.boxes.requestedSendToBatch,
          [ClientDashboardCardDataKey.SEND_BOXES]: result.boxes.inBatchOnTheWay,
          [ClientDashboardCardDataKey.ALL_REQUESTS]: result.requests.all,
          [ClientDashboardCardDataKey.REQUESTS_IN_WORK]: result.requests.inProcess,
          [ClientDashboardCardDataKey.REQUESTS_WITHOUT_PROPOSAL]: result.requests.noProposals,
          [ClientDashboardCardDataKey.ALL_ORDERS]: result.orders.all,
          [ClientDashboardCardDataKey.PAID_ORDERS]: result.orders.paid,
          [ClientDashboardCardDataKey.CANCELED_ORDERS]: result.orders.canceled,
        }
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickInfoCardViewMode(route, dataGridFilter) {
    if (dataGridFilter) {
      this.history.push(route, { dataGridFilter })
    } else {
      this.history.push(route)
    }
  }

  onClickAddProduct(route) {
    this.history.push(route, { isModalOpen: true })
  }
}
