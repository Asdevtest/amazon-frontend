import {makeAutoObservable} from 'mobx'

import {UserModel} from '@models/user-model'

export class ClientProfileViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 5
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
}
