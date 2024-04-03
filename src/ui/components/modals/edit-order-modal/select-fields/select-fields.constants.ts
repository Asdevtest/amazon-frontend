import { OrderStatus } from '@typings/enums/order/order-status'

export const showSlideshowStatuses = [
  OrderStatus.READY_FOR_BUYOUT,
  OrderStatus.IN_STOCK,
  OrderStatus.CANCELED_BY_CLIENT,
  OrderStatus.CANCELED_BY_BUYER,
]
