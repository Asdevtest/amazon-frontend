import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export const shopFields = [
  {
    label: 'Parent product',
    value: 0,
  },
  {
    label: 'Child product',
    value: 1,
  },
]

export const shopColumnMenuConfig = [
  {
    field: 'parentProductShop',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.OBJECT,
  },

  {
    field: 'childProductShop',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.OBJECT,
  },
]
