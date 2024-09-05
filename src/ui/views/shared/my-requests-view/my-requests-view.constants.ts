import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { SwitcherCondition } from './my-requests-view.type'

export const filtersFields = [
  'humanFriendlyId',
  'updatedAt',
  'status',
  'title',
  'spec',
  'price',
  'timeoutAt',
  'asin',
  'skuByClient',
  'amazonTitle',
  'createdBy',
  'sub',
  'subUsers',
  'priority',
  'createdAt',
  'announcementCreatedBy',
  'taskComplexity',
  'shopId',
]

export const radioButtonOptions = [
  {
    label: t(TranslationKey['Requests in progress']),
    value: SwitcherCondition.IN_PROGRESS,
  },
  {
    label: t(TranslationKey['Ready to check']),
    value: SwitcherCondition.READY_TO_CHECK,
  },
  {
    label: t(TranslationKey['Completed requests']),
    value: SwitcherCondition.COMPLETED,
  },
]

export const fieldsForSearch = ['title', 'humanFriendlyId', 'asin']
