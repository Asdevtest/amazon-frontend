import { action, computed, observable } from 'mobx'

export const servicesDetailsViewConfig = {
  announcementId: observable,
  showReviewModal: observable,
  currentReviewModalUser: observable,

  rows: computed,

  deleteAnnouncementsByGuid: action.bound,
  onClickOpenBtn: action.bound,
  onClickEditBtn: action.bound,
  onClickBackBtn: action.bound,
  onClickReview: action.bound,
}
