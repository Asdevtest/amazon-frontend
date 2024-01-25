import { RequestStatus } from '@constants/requests/request-status'

export const allowStatuses = [
  RequestStatus.DRAFT,
  RequestStatus.PUBLISHED,
  RequestStatus.IN_PROCESS,
  RequestStatus.EXPIRED,
]

export const filtersFields = [
  'humanFriendlyId',
  'updatedAt',
  'status',
  'title',
  'specType',
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
