import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ProposalsCondition } from './my-proposals-view.types'

export const filtersFields = [
  'status',
  'createdBy',
  'sub',
  'updatedAt',
  'xid',
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

export const additionalFields = ['skuByClient', 'amazonTitle']

export const fieldsForSearch = ['asin', 'title', 'xid', 'skuByClient']

export const customSwitcherSettings = () => [
  { label: t(TranslationKey['In the work']), value: ProposalsCondition.IN_THE_WORK },
  { label: t(TranslationKey.Executed), value: ProposalsCondition.EXECUTED },
]

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
