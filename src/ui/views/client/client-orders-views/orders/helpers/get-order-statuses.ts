import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus } from '@constants/orders/order-status'

export const getOrderStatuses = (pathname: string) => {
  switch (pathname) {
    case routsPathes.CLIENT_ORDERS:
      return [
        OrderStatus.AT_PROCESS,
        OrderStatus.READY_TO_PROCESS,
        OrderStatus.READY_FOR_PAYMENT,
        OrderStatus.PAID_TO_SUPPLIER,
        OrderStatus.TRACK_NUMBER_ISSUED,
        OrderStatus.VERIFY_RECEIPT,
        OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
        OrderStatus.IN_STOCK,
        OrderStatus.CANCELED_BY_BUYER,
        OrderStatus.CANCELED_BY_CLIENT,
        OrderStatus.PARTIALLY_PAID,
      ]
    case routsPathes.CLIENT_PENDING_ORDERS:
      return [OrderStatus.FORMED, OrderStatus.PENDING, OrderStatus.READY_FOR_BUYOUT]

    default:
      return [OrderStatus.AT_PROCESS, OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
  }
}
