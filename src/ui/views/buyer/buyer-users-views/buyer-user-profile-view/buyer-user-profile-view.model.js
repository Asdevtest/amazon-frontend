import {makeAutoObservable} from 'mobx'

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
  selectedPrivatLabel = undefined
  showModela0 = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getUserDataMy() {
    console.log(UserModel.userInfo)
    const result = await UserModel.getUserInfo()
    this.userDataMy = result
  }

  onTriggerShowModal0(e, value) {
    this.showModela0 = value
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
    this.selectedPrivatLabel = BUYER_USER_INITIAL_LIST[index]
    this.showModela0 = !this.showModela0
  }

  onTrgiggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }
}
