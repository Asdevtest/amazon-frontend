import { supplierCardsViewColumns } from '../columns/supplier-cards-view.columns'
import { suppliersViewColumns } from '../columns/suppliers-view.columns'
import { TableView } from '../suppliers-view.type'

export const getTableColumns = (activeTable: TableView) => {
  switch (activeTable) {
    case TableView.SUPLLIERS:
      return suppliersViewColumns
    case TableView.CARDS:
      return supplierCardsViewColumns
  }
}
