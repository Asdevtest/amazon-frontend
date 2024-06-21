import { routsPathes } from '@constants/navigation/routs-pathes'

export const getSortModel = (pathname: string) => {
  switch (pathname) {
    case routsPathes.CLIENT_PENDING_ORDERS:
      return [{ field: 'deadline', sort: 'asc' }]

    default:
      return [{ field: 'createdAt', sort: 'desc' }]
  }
}
