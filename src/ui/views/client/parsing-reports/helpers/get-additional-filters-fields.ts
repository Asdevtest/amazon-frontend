import { ParsingReportsType } from '../parsing-reports.type'

export const getAdditionalFiltersFields = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.VOICE:
      return ['productName', 'sku']

    case ParsingReportsType.INVENTORY:
      return ['title', 'sku']

    case ParsingReportsType.INVENTORY_PLANNING:
      return ['fbaCapacityLimitsMonth', 'fbaCapacityLimitsValue']

    case ParsingReportsType.ORDERS:
    // case ParsingReportsType.PPC_SALES_WEEKS:
    //   case ParsingReportsType.FYP_SEARCH_SUPPRESSED:
    case ParsingReportsType.RETURNS:
    case ParsingReportsType.FYP_OUT_OF_STOCK:
    case ParsingReportsType.PPC_ORGANIC:
      return ['sku']
  }
}
