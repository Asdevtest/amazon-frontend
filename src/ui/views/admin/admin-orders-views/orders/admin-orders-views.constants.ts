import { AdminOrdersStatusGroup } from './admin-orders-views.types'

export const fieldsForSearch = ['asin', 'xid', 'skuByClient', 'amazonTitle']

export const ordersStatusGroupTranslate: Record<AdminOrdersStatusGroup, string> = {
  [AdminOrdersStatusGroup.ALL]: 'All',
  [AdminOrdersStatusGroup.READ_TO_PROCESS]: 'Available for processing',
  [AdminOrdersStatusGroup.AT_PROCESS]: 'The buyer took the order',
  [AdminOrdersStatusGroup.PAID]: 'The buyer paid for the order',
  [AdminOrdersStatusGroup.TRACK_NUMBER_ISSUED]: 'Track number issued',
  [AdminOrdersStatusGroup.IN_STOCK]: 'Came to the warehouse',
  [AdminOrdersStatusGroup.CANCELED_BY_BUYER]: 'Return Order',
  [AdminOrdersStatusGroup.NEED_CONFIRMING]: 'Additional payment required',
  [AdminOrdersStatusGroup.CANCELED_BY_CLIENT]: 'Canceled by Client',
  [AdminOrdersStatusGroup.VERIFY_RECEIPT]: 'Verify receipt',
}
