import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export const productionTimeColumnMenuValue = [
  {
    field: 'minProductionTerm',
    table: DataGridFilterTables.SUPPLIER_CARDS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
  {
    field: 'maxProductionTerm',
    table: DataGridFilterTables.SUPPLIER_CARDS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
]
