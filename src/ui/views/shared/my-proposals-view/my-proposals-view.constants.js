import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const filtersFields = [
  'status',
  'createdBy',
  'sub',
  'updatedAt',
  'humanFriendlyId',
  'priority',
  'title',
  'maxAmountOfProposals',
  'timeoutAt',
  'requestCreatedBy',
  'asin',
  'skuByClient',
  'amazonTitle',
  'taskComplexity',
  'spec',
  'reworkCounter',
  'shop',
  'announcement',
  'specType',
]

export const switcherConditions = {
  inTheWork: 'inTheWork',
  executed: 'executed',
}

export const customSwitcherSettings = [
  { label: () => t(TranslationKey['In the work']), value: switcherConditions.inTheWork },
  { label: () => t(TranslationKey.Executed), value: switcherConditions.executed },
]

export const searchInputPlaceholder = `${t(TranslationKey['Search by'])} ${t(TranslationKey.ASIN)}, ${t(
  TranslationKey.Title,
)}, ${t(TranslationKey.ID)}`

export const inTheWorkStatuses = [
  RequestStatus.READY_TO_VERIFY,
  RequestStatus.OFFER_CONDITIONS_ACCEPTED,
  RequestStatus.CORRECTED,
  RequestStatus.TO_CORRECT,
  RequestStatus.CREATED,
  RequestStatus.OFFER_CONDITIONS_CORRECTED,
]

export const executedStatuses = [
  RequestStatus.ACCEPTED_BY_CLIENT,
  RequestStatus.CANCELED_BY_EXECUTOR,
  RequestStatus.OFFER_CONDITIONS_REJECTED,
]
