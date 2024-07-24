import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export const productionTimeColumnMenuItems = [
  {
    label: 'Min. production time, days',
    value: 0,
  },
  {
    label: 'Max. production time, days',
    value: 1,
  },
]

export const productionTimeColumnMenuValue = [
  {
    field: 'minProductionTerm',
    table: DataGridFilterTables.SUPPLIERS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
  {
    field: 'maxProductionTerm',
    table: DataGridFilterTables.SUPPLIERS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
]
