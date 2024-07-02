import { BuyerSearchSuppliers } from '../buyer-search-supplier.types'

export const getQuery = (pathName: string) => {
  switch (pathName) {
    case BuyerSearchSuppliers.SUPERVISOR:
      return { isCreatedByClient: false }
    case BuyerSearchSuppliers.CLIENT:
      return { isCreatedByClient: true }
    default:
      return null
  }
}
