import { ParsingReportsType } from '../parsing-reports.type'

export const getInitialSortModel = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.PPC_ORGANIC:
    case ParsingReportsType.PPC_SALES_WEEKS:
    case ParsingReportsType.FBA_INVENTORY:
    case ParsingReportsType.FEEDBACK:
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
