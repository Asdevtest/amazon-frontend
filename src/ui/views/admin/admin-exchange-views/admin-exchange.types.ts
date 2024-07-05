export enum AdminExchangeStatuses {
  ALL = 'all',
  CREATED = 'created',
  NEW = 'new',
  SUPPLIER_SEARCH = 'supplierSearch',
  IN_WORK = 'inWork',
  SUPPLIER_FOUND = 'supplierFound',
  SUPPLIER_NOT_FOUND = 'supplierNotFound',
  PRICE_HIGHER = 'priceHigher',
  COMPLETE = 'complete',
  REJECTED = 'rejected',
  COMPLETE_PRICE_NOT_ACCEPTABLE = 'completeSupplierNotFound',
  COMPLETE_SUPPLIER_NOT_FOUND = 'completePriceNotAcceptable',
}

export const adminExchangeStatusesTranslations: Record<AdminExchangeStatuses, string> = {
  [AdminExchangeStatuses.ALL]: 'All',
  [AdminExchangeStatuses.CREATED]: 'Created',
  [AdminExchangeStatuses.NEW]: 'New',
  [AdminExchangeStatuses.SUPPLIER_SEARCH]: 'Supplier search',
  [AdminExchangeStatuses.IN_WORK]: 'In the work of a Buyer',
  [AdminExchangeStatuses.SUPPLIER_FOUND]: 'Supplier found by Buyer',
  [AdminExchangeStatuses.SUPPLIER_NOT_FOUND]: 'Supplier not found by Buyer',
  [AdminExchangeStatuses.PRICE_HIGHER]: 'Price is higher than MZC',
  [AdminExchangeStatuses.COMPLETE]: 'Published',
  [AdminExchangeStatuses.REJECTED]: 'Rejected',
  [AdminExchangeStatuses.COMPLETE_PRICE_NOT_ACCEPTABLE]: 'No supplier (completed by supervisor)',
  [AdminExchangeStatuses.COMPLETE_SUPPLIER_NOT_FOUND]: "The supplier's price does't fit",
}
