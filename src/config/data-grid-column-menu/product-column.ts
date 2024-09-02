import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export enum ProductColumnMenuType {
  DEFAULT = 'default',
  CHILD = 'child',
  PARENT = 'parent',
}

export interface ProductColumnMenuValueParams<T = DataGridFilterTables> {
  columnType?: ProductColumnMenuType
  isSimpleSku?: boolean
  table?: T
  customTitleField?: string
}

export interface ProductColumnMenuItemsParams {
  withoutSku?: boolean
  withoutTitle?: boolean
}

export const getProductColumnMenuItems = ({ withoutSku, withoutTitle }: ProductColumnMenuItemsParams = {}) => {
  const productColumnMenuItems = [
    {
      label: 'ASIN',
      value: 0,
    },
  ]

  if (!withoutSku) {
    productColumnMenuItems.push({
      label: 'SKU',
      value: 1,
    })
  }

  if (!withoutTitle) {
    productColumnMenuItems.push({
      label: 'Title',
      value: 2,
    })
  }

  return productColumnMenuItems
}

export const getProductColumnMenuValue = <T>({
  columnType,
  isSimpleSku,
  table,
  customTitleField,
}: ProductColumnMenuValueParams<T> = {}) => {
  const asinField =
    columnType === ProductColumnMenuType.PARENT
      ? 'parentProductAsin'
      : columnType === ProductColumnMenuType.CHILD
      ? 'childProductAsin'
      : 'asin'

  const skuField =
    columnType === ProductColumnMenuType.PARENT
      ? 'parentProductSkuByClient'
      : columnType === ProductColumnMenuType.CHILD
      ? 'childProductSkuByClient'
      : isSimpleSku
      ? 'sku'
      : 'skuByClient'

  const titleField = customTitleField
    ? customTitleField
    : columnType === ProductColumnMenuType.PARENT
    ? 'parentProductAmazonTitle'
    : columnType === ProductColumnMenuType.CHILD
    ? 'childProductAmazonTitle'
    : 'amazonTitle'

  return [
    {
      field: asinField,
      table: table || DataGridFilterTables.PRODUCTS,
      columnKey: ColumnMenuKeys.STRING,
    },
    {
      field: skuField,
      table: table || DataGridFilterTables.PRODUCTS,
      columnKey: ColumnMenuKeys.STRING,
    },
    {
      field: titleField,
      table: table || DataGridFilterTables.PRODUCTS,
      columnKey: ColumnMenuKeys.STRING,
    },
  ]
}
