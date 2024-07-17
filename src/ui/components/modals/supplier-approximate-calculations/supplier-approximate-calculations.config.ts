import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export const weightColumnMenuValue = [
  {
    field: 'minWeight',
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
  {
    field: 'maxWeight',
    table: DataGridFilterTables.STOREKEEPERS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
]
