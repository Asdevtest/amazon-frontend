import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export const productColumnMenuItems = [
  {
    label: 'ASIN',
    value: 0,
  },
  {
    label: 'SKU',
    value: 1,
  },
  {
    label: 'Title',
    value: 2,
  },
]

export const productColumnMenuValue = [
  {
    field: 'asin',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.STRING,
  },
  {
    field: 'skuByClient',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.STRING,
  },
  {
    field: 'amazonTitle',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.STRING,
  },
]
