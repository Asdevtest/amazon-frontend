import { action, computed, observable } from 'mobx'

export const anotherUserProfileConfig = {
  userId: observable,
  user: observable,
  reviews: observable,
  tabHistory: observable,
  tabReview: observable,
  showConfirmWorkResultFormModal: observable,
  headerInfoData: observable,

  userInfo: computed,
  simpleChats: computed,

  onClickWriteBtn: action.bound,
  getReviews: action.bound,
  getUserById: action.bound,
  onAcceptReview: action.bound,
}
