import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { TableView } from '../suppliers-view.type'

export const getTableKey = (activeTable: TableView) => {
  switch (activeTable) {
    case TableView.SUPLLIERS:
      return DataGridTablesKeys.BUYER_SUPPLIERS
    case TableView.CARDS:
      return DataGridTablesKeys.BUYER_SUPPLIERS_CARDS
  }
}
