import { routsPathes } from '@constants/navigation/routs-pathes'

export const getStatusGroup = (pathname: string) => {
  switch (pathname) {
    case routsPathes.BUYER_MY_ORDERS_NOT_PAID:
      return 'notPaid'

    case routsPathes.BUYER_MY_ORDERS_INBOUND:
      return 'inbound'

    case routsPathes.BUYER_MY_ORDERS_READY_FOR_PAYMENT:
      return 'readyForPayment'

    case routsPathes.BUYER_MY_ORDERS_PARTIALLY_PAID:
      return 'partiallyPaid'

    case routsPathes.BUYER_MY_ORDERS_NEED_TRACK_NUMBER:
      return 'needTrackNumber'

    case routsPathes.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED:
      return 'confirmationRequired'

    case routsPathes.BUYER_MY_ORDERS_CLOSED_AND_CANCELED:
      return 'closed'

    case routsPathes.BUYER_MY_ORDERS_ALL_ORDERS:
      return 'buyerOngoing'
  }
}
