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

export const accessToProductColumnMenuConfig = [
  {
    field: 'parentProductSubUsers',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.OBJECT,
  },
  {
    field: 'childProductSubUsers',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.OBJECT,
  },
]

export const createdByFields = [
  {
    label: 'Master user',
    value: 0,
  },
  {
    label: 'Sub user',
    value: 1,
  },
]

export const createdByColumnMenuConfig = [
  {
    field: 'createdBy',
    table: DataGridFilterTables.IDEAS,
    columnKey: ColumnMenuKeys.OBJECT,
    sortOptions: 'asc',
  },

  {
    field: 'sub',
    table: DataGridFilterTables.IDEAS,
    columnKey: ColumnMenuKeys.OBJECT,
    sortOptions: 'asc',
  },
]
