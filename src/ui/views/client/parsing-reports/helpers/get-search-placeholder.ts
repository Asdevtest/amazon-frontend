import { ParsingReportsType } from '../parsing-reports.type'

export const getSearchPlaceholder = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.ORDERS:
      return 'AMZ order ID, ASIN, SKU'
    case ParsingReportsType.FEEDBACK:
      return 'Comment'
    case ParsingReportsType.TRANSACTIONS:
      return 'AMZ order ID'
    case ParsingReportsType.INVENTORY:
    case ParsingReportsType.PPC_ORGANIC:
      return 'ASIN, SKU'
    case ParsingReportsType.PERFORMANCE_NOTIFICATIONS:
      return 'AMZ ID, Title, Text'
    case ParsingReportsType.FBA_INVENTORY:
    case ParsingReportsType.VOICE:
      return 'ASIN, SKU, FNSKU'
    case ParsingReportsType.RETURNS:
      return 'AMZ Order ID, ASIN, SKU, FNSKU, Fulfillment Center ID, Customer comments'
    case ParsingReportsType.BRANDS_REVIEW:
      return 'Author, ASIN, Title, AMZ ID'
    case ParsingReportsType.INVENTORY_SHIPMENTS:
      return 'SKU, Shipment ID, Reference ID, Ship to, Tracking number'
  }
}
