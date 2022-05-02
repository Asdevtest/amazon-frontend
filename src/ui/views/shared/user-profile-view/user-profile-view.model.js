import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {OtherModel} from '@models/other-model'
import {UserModel} from '@models/user-model'

import {dataURLtoFile} from '@utils/upload-files'

export class ProfileViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  get user() {
    return UserModel.userInfo
  }

  showAvatarEditModal = false
  showUserInfoModal = false

  checkValidationNameOrEmail = {}

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1
  productList = []
  tabExchange = 0
  tabHistory = 0
  tabReview = 0
  selectedUser = undefined
  showTabModal = false
  showInfoModal = false

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

  onClickChangeAvatar() {
    this.onTriggerOpenModal('showAvatarEditModal')
  }

  onClickChangeUserInfo() {
    this.onTriggerOpenModal('showUserInfoModal')
  }

  async onSubmitUserInfoEdit(data) {
    try {
      this.checkValidationNameOrEmail = await UserModel.isCheckUniqueUser({
        name: data.name,
        email: data.email,
      })

      if (this.checkValidationNameOrEmail.nameIsUnique || this.checkValidationNameOrEmail.emailIsUnique) {
        return
      } else {
        await UserModel.changeUserInfo(data)

        await UserModel.getUserInfo()

        this.onTriggerOpenModal('showUserInfoModal')
      }
    } catch (error) {
      this.error = error
    }
  }

  async onSubmitAvatarEdit(imageData) {
    const file = dataURLtoFile(imageData, this.user._id)

    const formData = new FormData()
    formData.append('filename', file)

    try {
      await OtherModel.postAvatar(formData)

      this.onTriggerOpenModal('showAvatarEditModal')

      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      this.error = error
    }
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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
