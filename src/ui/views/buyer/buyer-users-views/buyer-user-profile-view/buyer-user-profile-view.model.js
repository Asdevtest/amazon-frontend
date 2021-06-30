import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {BUYER_USER_INITIAL_LIST, BUYER_USER_INITIAL_USER} from '@constants/mocks'

import {UserModel} from '@models/user-model'

export class BuyerUserProfileViewModel {
  history = undefined
  requestStatus = undefined

  userDataMy = undefined
  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  productList = BUYER_USER_INITIAL_LIST
  user = BUYER_USER_INITIAL_USER
  tabExchange = 0
  tabHistory = 0
  tabReview = 0
  headerInfoData = {
    investorsCount: 255,
    goodsFound: 875,
    transactionsVolume: 7555,
    earnedAmount: 1255,
    addInSave: 12,
    inBlocked: 12,
    youBlocked: 14,
    accountCreateAt: 11,
  }

  selectedPrivateLabel = undefined
  showPrivateLabelModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.getUserDataMy()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getUserDataMy() {
    const result = await UserModel.getUserInfo()
    this.userDataMy = result
  }

  onTriggerPrivateLabelModal(e, value) {
    this.showPrivateLabelModal = value
  }

  onChangeTabReview(e, value) {
    this.tabReview = value
  }

  onChangeTabHistory(e, value) {
    this.tabHistory = value
  }

  onChangeTabExchange(e, value) {
    this.tabExchange = value
  }

  onClickButtonPrivateLabel(index) {
    this.selectedPrivateLabel = BUYER_USER_INITIAL_LIST[index]
    this.showPrivateLabelModal = !this.showPrivateLabelModal
  }

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }
}
