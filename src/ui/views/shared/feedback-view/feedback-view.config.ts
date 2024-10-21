import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { FeedbackStatus } from '@typings/enums/feedback-status'
import { IFeedback } from '@typings/models/administrators/feedback'

export const feedbackViewConfig = {
  showContentEditorForm: observable,
  showTicketForm: observable,
  feedback: observable,

  contentEditorFormTitle: computed,
  userInfo: computed,
  creator: computed,

  onToggleContentEditorForm: action.bound,
  onToggleTicketForm: action.bound,
  onSelectFeedback: action.bound,
  onRemoveFeedback: action.bound,
  onCreateFeedback: action.bound,
}

export const fieldsForSearch = ['status', 'title', 'text']

export interface ColumnProps {
  onSelectFeedback: (ticket: IFeedback) => void
  onRemoveFeedback: (id: string) => void
  creator: () => boolean
}

export const getStatusText = (status: FeedbackStatus) => {
  switch (status) {
    case FeedbackStatus.CREATED:
      return t(TranslationKey.New)
    case FeedbackStatus.IN_PROCESS:
      return t(TranslationKey['At process'])
    case FeedbackStatus.ACCEPTED:
      return t(TranslationKey.Accepted)
    case FeedbackStatus.REJECTED:
      return t(TranslationKey.Rejected)
    default:
      return t(TranslationKey.New)
  }
}
