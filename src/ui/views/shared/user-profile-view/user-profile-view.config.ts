import { action, computed, observable } from 'mobx'

export const userProfileConfig = {
  showAvatarEditModal: observable,
  showUserInfoModal: observable,
  showTabModal: observable,
  showConfirmWorkResultFormModal: observable,
  tabHistory: observable,
  selectedUser: observable,
  reviews: observable,
  headerInfoData: observable,
  activeSessions: observable,
  userInfoEditFormFlag: observable,

  userInfo: computed,

  onSubmitUserInfoEdit: action.bound,
  onSubmitAvatarEdit: action.bound,
  onChangeTabHistory: action.bound,
  onClickButtonPrivateLabel: action.bound,
  getReviews: action.bound,
  onAcceptReview: action.bound,
  getActiveSessions: action.bound,
  logoutSession: action.bound,
  onToggleUserInfoEditFormFlag: action.bound,
  onLogoutSession: action.bound,
  onTriggerEnterInformation: action.bound,
}
