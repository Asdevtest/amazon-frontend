import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export const productionTimeColumnMenuValue = [
  {
    field: 'currentSupplierCardMinProductionTerm',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
  {
    field: 'currentSupplierCardMaxProductionTerm',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
]
