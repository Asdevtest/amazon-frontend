import { ParsingReportsType } from '../parsing-reports.type'

export const getAdditionalFiltersFields = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.VOICE:
      return ['sku', 'amazonTitle']
    case ParsingReportsType.ORDERS:
      return ['sku']
    case ParsingReportsType.INVENTORY:
      return ['title', 'asin', 'sku']
  }
}
