import { RequestStatus } from '@constants/requests/request-status'

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
  'typeTask',
  'reworkCounter',
]

export const switcherConditions = {
  inTheWork: 'inTheWork',
  executed: 'executed',
}

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
