import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {UserModel} from '@models/user-model'

export class ClientProfileViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1
  productList = []
  tabExchange = 0
  tabHistory = 0
  tabReview = 0
  selectedUser = undefined
  showTabModal = false

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

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  get user() {
    return UserModel.userInfo
  }

  onTriggerShowTabModal() {
    this.showTabModal = !this.showTabModal
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

  onClickButtonPrivateLabel(item) {
    this.selectedUser = item
    this.onTriggerShowTabModal()
  }

  onTriggerDrawerOpen = () => {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
