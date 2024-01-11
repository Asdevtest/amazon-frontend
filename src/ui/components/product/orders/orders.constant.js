import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'

export const selectedStatus = [
  OrderStatusByKey[OrderStatus.AT_PROCESS],
  OrderStatusByKey[OrderStatus.READY_TO_PROCESS],
  OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
  OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
  OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
]

export const canceledStatus = [
  OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT],
  OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER],
]

export const statusesForChecking = [
  OrderStatusByKey[OrderStatus.FORMED],
  OrderStatusByKey[OrderStatus.PENDING],
  OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT],
]

export const completedStatus = [OrderStatusByKey[OrderStatus.IN_STOCK], OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]]
