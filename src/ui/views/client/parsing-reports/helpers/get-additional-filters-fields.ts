import { ParsingReportsType } from '../parsing-reports.type'

export const getAdditionalFiltersFields = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.VOICE:
      return ['amazonTitle', 'sku']

    case ParsingReportsType.INVENTORY:
      return ['title', 'sku']

    case ParsingReportsType.ORDERS:
    case ParsingReportsType.RETURNS:
    case ParsingReportsType.FYP_OUT_OF_STOCK:
      return ['sku']
  }
}
