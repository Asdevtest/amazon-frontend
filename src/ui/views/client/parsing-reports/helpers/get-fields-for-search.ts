import { ParsingReportsType } from '../parsing-reports.type'

export const getFieldsForSearch = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.ORDERS:
      return ['amzOrderId', 'asin', 'sku']
    case ParsingReportsType.FEEDBACK:
      return ['comments', 'shop']
    case ParsingReportsType.TRANSACTIONS:
      return ['amzOrderId']
    case ParsingReportsType.INVENTORY:
      return ['fnSku', 'asin', 'sku']
    case ParsingReportsType.PERFORMANCE_NOTIFICATIONS:
      return ['shop', 'amzId', 'title', 'text']
    case ParsingReportsType.RETURNS:
      return ['shop', 'amzOrderId', 'asin', 'sku', 'fnsku', 'fulfillmentCenterId', 'customerComments']
    case ParsingReportsType.BRANDS_REVIEW:
      return ['author', 'asin', 'title', 'amzId']
    case ParsingReportsType.INVENTORY_SHIPMENTS:
      return ['sku', 'shipmentId', 'referenceId', 'shipTo', 'trackingNumber']
    case ParsingReportsType.VOICE:
      return ['asin', 'sku', 'fnsku']
    case ParsingReportsType.PPC_ORGANIC:
      return ['asin', 'sku']

    default:
      return []
  }
}
