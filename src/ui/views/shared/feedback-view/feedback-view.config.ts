import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { t } from '@utils/translations'

import { FeedbackStatus } from '@typings/enums/feedback-status'
import { UiTheme } from '@typings/enums/ui-theme'
import { IFeedback } from '@typings/models/administrators/feedback'

export const feedbackViewConfig = {
  showContentEditorForm: observable,
  showTicketForm: observable,
  feedback: observable,

  contentEditorFormTitle: computed,
  userInfo: computed,
  creator: computed,
  onTicketFormSubmit: computed,

  onToggleContentEditorForm: action.bound,
  onToggleTicketForm: action.bound,
  onSelectFeedback: action.bound,
  onRemoveFeedback: action.bound,
  onCreateFeedback: action.bound,
  onUpdateFeedback: action.bound,
}

export const fieldsForSearch = ['title', 'text']

export interface ColumnProps {
  onSelectFeedback: (ticket: IFeedback) => void
  onRemoveFeedback: (id: string) => void
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

export const getStatusColor = (status: FeedbackStatus) => {
  const blueColor = SettingsModel.uiTheme === UiTheme.dark ? '#4CA1DE' : '#0A6FE8'

  switch (status) {
    case FeedbackStatus.CREATED:
      return blueColor
    case FeedbackStatus.IN_PROCESS:
      return '#F3AF00'
    case FeedbackStatus.ACCEPTED:
      return '#00B746'
    case FeedbackStatus.REJECTED:
      return '#FF1616'
    default:
      return blueColor
  }
}
