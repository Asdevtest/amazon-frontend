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

export const productionTermColumnMenuItems = [
  {
    label: 'Min. production time, days',
    value: 0,
  },
  {
    label: 'Max. production time, days',
    value: 1,
  },
]

export const productionTermColumnMenuValue = [
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
