import { ParsingReportsType } from '../parsing-reports.type'

export const getAdditionalFiltersFields = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.VOICE:
    case ParsingReportsType.FBA_INVENTORY:
    case ParsingReportsType.RETURNS:
      return ['productName', 'sku', 'productId']

    case ParsingReportsType.INVENTORY:
      return ['title', 'sku']

    case ParsingReportsType.INVENTORY_PLANNING:
      return ['fbaCapacityLimitsMonth', 'fbaCapacityLimitsValue']

    case ParsingReportsType.ORDERS:
    case ParsingReportsType.PPC_ORGANIC:
      return ['sku', 'productId']
  }
}
