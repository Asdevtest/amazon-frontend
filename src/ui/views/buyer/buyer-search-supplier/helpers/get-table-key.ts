import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { BuyerSearchSuppliers } from '../buyer-search-supplier.types'

export const getTableKey = (pathName: string) => {
  switch (pathName) {
    case BuyerSearchSuppliers.SUPERVISOR:
      return DataGridTablesKeys.BUYER_SEARCH_SUPPLIER_BY_SUPERVISOR
    case BuyerSearchSuppliers.CLIENT:
      return DataGridTablesKeys.BUYER_SEARCH_SUPPLIER_BY_CLIENT
    default:
      return undefined
  }
}
