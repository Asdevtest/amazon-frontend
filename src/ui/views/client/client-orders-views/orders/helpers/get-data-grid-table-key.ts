import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { routsPathes } from '@constants/navigation/routs-pathes'

export const getDataGridTableKey = (pathname: string) => {
  switch (pathname) {
    case routsPathes.CLIENT_ORDERS:
      return DataGridTablesKeys.CLIENT_ORDERS
    case routsPathes.CLIENT_PENDING_ORDERS:
      return DataGridTablesKeys.CLIENT_PENDING_ORDERS

    default:
      return DataGridTablesKeys.CLIENT_ORDERS
  }
}
