import { routsPathes } from '@constants/navigation/routs-pathes'

export const getOrderStatusGroup = (pathname: string) => {
  switch (pathname) {
    case routsPathes.CLIENT_PENDING_ORDERS:
      return 'pending'

    default:
      return 'ongoing'
  }
}
