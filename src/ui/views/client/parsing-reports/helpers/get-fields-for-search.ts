import { ParsingReportsType } from '../parsing-reports.type'

export const getFieldsForSearch = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.ORDERS:
      return ['amzOrderId', 'asin', 'sku']
    case ParsingReportsType.FEEDBACK:
      return ['comments']
    case ParsingReportsType.TRANSACTIONS:
      return ['amzOrderId']
    case ParsingReportsType.INVENTORY:
      return ['asin', 'sku']
    case ParsingReportsType.PERFORMANCE_NOTIFICATIONS:
      return ['amzId', 'title', 'text']
    case ParsingReportsType.RETURNS:
      return ['amzOrderId', 'asin', 'sku', 'fnsku', 'fulfillmentCenterId', 'customerComments']
    case ParsingReportsType.BRANDS_REVIEW:
      return ['author', 'asin', 'title', 'amzId']
    case ParsingReportsType.INVENTORY_SHIPMENTS:
      return ['sku', 'shipmentId', 'referenceId', 'shipTo', 'trackingNumber']
    case ParsingReportsType.VOICE:
    case ParsingReportsType.FBA_INVENTORY:
      return ['asin', 'sku', 'fnsku']
    case ParsingReportsType.PPC_ORGANIC:
      return ['asin', 'sku']

    default:
      return []
  }
}
