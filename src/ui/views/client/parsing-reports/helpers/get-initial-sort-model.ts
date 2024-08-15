import { ParsingReportsType } from '../parsing-reports.type'

export const getInitialSortModel = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.CAMPAIGNS:
    case ParsingReportsType.INVENTORY:
    case ParsingReportsType.RETURNS:
    case ParsingReportsType.INVENTORY_SHIPMENTS:
    case ParsingReportsType.VOICE:
    case ParsingReportsType.FYP_OUT_OF_STOCK:
    case ParsingReportsType.FYP_SEARCH_SUPPRESSED:
    case ParsingReportsType.INCOME:
      return [{ field: 'dateUpdated', sort: 'desc' }]
    default:
      return [{ field: 'date', sort: 'desc' }]
  }
}
