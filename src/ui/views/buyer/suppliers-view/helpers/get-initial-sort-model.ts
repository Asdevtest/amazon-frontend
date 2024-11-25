import { GridSortModel } from '@mui/x-data-grid-premium'

import { TableView } from '../suppliers-view.type'

export const getInitialSortModel = (activeTable: TableView): GridSortModel => {
  switch (activeTable) {
    case TableView.SUPLLIERS:
      return [{ field: 'updatedAt', sort: 'desc' }]
    case TableView.CARDS:
      return [{ field: 'updatedAt', sort: 'desc' }]
  }
}
