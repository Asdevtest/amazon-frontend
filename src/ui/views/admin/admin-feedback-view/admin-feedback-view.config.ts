import { action, computed, observable } from 'mobx'

import { GridSortModel } from '@mui/x-data-grid-premium'

export const adminFeedbackConfig = {
  showReplyFeedbackModal: observable,
  selectedFeedback: observable,

  userInfo: computed,
  simpleChats: computed,

  onClickWrite: action.bound,
  onClickOpenFeedback: action.bound,
}

export const fieldsForSearch = ['email', 'name']
export const sortConfig: GridSortModel = [{ field: 'updatedAt', sort: 'desc' }]
