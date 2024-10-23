import { action, computed, observable } from 'mobx'

export const servicesDetailsViewConfig = {
  announcementId: observable,
  showReviewModal: observable,
  currentReviews: observable,
  currentReviewModalUser: observable,

  rows: computed,

  deleteAnnouncementsByGuid: action.bound,
  onClickOpenBtn: action.bound,
  onClickEditBtn: action.bound,
  onClickBackBtn: action.bound,
  getReviews: action.bound,
  onClickReview: action.bound,
}
