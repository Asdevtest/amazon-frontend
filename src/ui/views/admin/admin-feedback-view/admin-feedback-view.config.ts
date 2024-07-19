import { action, computed, observable } from 'mobx'

export const adminFeedbackConfig = {
  showReplyFeedbackModal: observable,
  selectedFeedback: observable,

  userInfo: computed,
  simpleChats: computed,

  onClickWrite: action.bound,
  onClickOpenFeedback: action.bound,
}

export const fieldsForSearch = ['email', 'name']
export const sortConfig = [{ field: 'updatedAt', sort: 'desc' }]
