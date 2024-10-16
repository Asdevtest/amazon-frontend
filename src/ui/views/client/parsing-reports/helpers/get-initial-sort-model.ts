import { GridSortModel } from '@mui/x-data-grid-premium'

import { ParsingReportsType } from '../parsing-reports.type'

export const getInitialSortModel = (activeTable: ParsingReportsType): GridSortModel => {
  switch (activeTable) {
    case ParsingReportsType.PPC_ORGANIC:
    // case ParsingReportsType.PPC_SALES_WEEKS:
    case ParsingReportsType.FBA_INVENTORY:
    case ParsingReportsType.FEEDBACK:

    case ParsingReportsType.INVENTORY:
    case ParsingReportsType.RETURNS:
    case ParsingReportsType.INVENTORY_SHIPMENTS:
    case ParsingReportsType.VOICE:
      return [{ field: 'updatedAt', sort: 'desc' }]

    case ParsingReportsType.CAMPAIGNS:
      return [{ field: 'type', sort: 'desc' }]
    default:
      return [{ field: 'updatedAt', sort: 'desc' }]
  }
}
