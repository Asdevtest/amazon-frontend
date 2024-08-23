import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export const payColumnMenuItems = [
  { label: 'To pay', value: 0 },
  { label: 'To pay partial', value: 1 },
]

export const payColumnMenuValue = [
  {
    field: 'priceInYuan',
    table: DataGridFilterTables.ORDERS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
  {
    field: 'partialPaymentAmountRmb',
    table: DataGridFilterTables.ORDERS,
    columnKey: ColumnMenuKeys.NUMBER,
  },
]
