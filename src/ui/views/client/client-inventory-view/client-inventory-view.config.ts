import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export const productionTimeColumnMenuValue = [
  {
    field: 'currentSupplierMinProductionTerm',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
  {
    field: 'currentSupplierMaxProductionTerm',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
]
