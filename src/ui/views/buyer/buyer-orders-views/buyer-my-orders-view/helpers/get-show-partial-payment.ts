import { routsPathes } from '@constants/navigation/routs-pathes'

export const getShowPartialPayment = (pathname: string) =>
  routsPathes.BUYER_MY_ORDERS_PARTIALLY_PAID === pathname || routsPathes.BUYER_MY_ORDERS_READY_FOR_PAYMENT === pathname
