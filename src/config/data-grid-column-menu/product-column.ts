import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export enum ProductColumnMenuType {
  DEFAULT = 'default',
  CHILD = 'child',
  PARENT = 'parent',
}

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

export const getProductColumnMenuValue = (columnType?: ProductColumnMenuType) => [
  {
    field:
      columnType === ProductColumnMenuType.PARENT
        ? 'parentProductAsin'
        : columnType === ProductColumnMenuType.CHILD
        ? 'childProductAsin'
        : 'asin',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.STRING,
  },
  {
    field:
      columnType === ProductColumnMenuType.PARENT
        ? 'parentProductSkuByClient'
        : columnType === ProductColumnMenuType.CHILD
        ? 'childProductSkuByClient'
        : 'skuByClient',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.STRING,
  },
  {
    field:
      columnType === ProductColumnMenuType.PARENT
        ? 'parentProductAmazonTitle'
        : columnType === ProductColumnMenuType.CHILD
        ? 'childProductAmazonTitle'
        : 'amazonTitle',
    table: DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.STRING,
  },
]
