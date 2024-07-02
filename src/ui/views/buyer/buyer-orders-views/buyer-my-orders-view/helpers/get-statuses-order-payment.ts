import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'

export const getStatusesOrderPayment = (pathname: string): string => {
  switch (pathname) {
    case routsPathes.BUYER_MY_ORDERS_NOT_PAID:
      return `${OrderStatusByKey[OrderStatus.AT_PROCESS as keyof typeof OrderStatusByKey]},${
        OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE as keyof typeof OrderStatusByKey]
      }`

    case routsPathes.BUYER_MY_ORDERS_READY_FOR_PAYMENT:
      return OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT as keyof typeof OrderStatusByKey]

    case routsPathes.BUYER_MY_ORDERS_PARTIALLY_PAID:
      return OrderStatusByKey[OrderStatus.PARTIALLY_PAID as keyof typeof OrderStatusByKey]

    default:
      return ''
  }
}
