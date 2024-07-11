import { routsPathes } from '@constants/navigation/routs-pathes'

export const getDisableCustomSort = (pathname: string) => pathname !== routsPathes.BUYER_MY_ORDERS_ALL_ORDERS
