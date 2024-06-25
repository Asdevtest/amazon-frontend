import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { routsPathes } from '@constants/navigation/routs-pathes'

export const getDataGridTableKey = (pathname: string) => {
  switch (pathname) {
    case routsPathes.BUYER_MY_ORDERS_NEED_TRACK_NUMBER:
      return DataGridTablesKeys.BUYER_MY_ORDERS_NEED_TRACK_NUMBER
    case routsPathes.BUYER_MY_ORDERS_INBOUND:
      return DataGridTablesKeys.BUYER_MY_ORDERS_INBOUND
    case routsPathes.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED:
      return DataGridTablesKeys.BUYER_MY_ORDERS_CONFIRMATION_REQUIRED
    case routsPathes.BUYER_MY_ORDERS_CLOSED_AND_CANCELED:
      return DataGridTablesKeys.BUYER_MY_ORDERS_CLOSED_AND_CANCELED
    case routsPathes.BUYER_MY_ORDERS_ALL_ORDERS:
      return DataGridTablesKeys.BUYER_MY_ORDERS_ALL_ORDERS
    default:
      return DataGridTablesKeys.BUYER_MY_ORDERS_NOT_PAID
  }
}
