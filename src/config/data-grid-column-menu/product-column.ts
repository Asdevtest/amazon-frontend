import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export enum ProductColumnMenuType {
  DEFAULT = 'default',
  CHILD = 'child',
  PARENT = 'parent',
}

export const getProductColumnMenuItems = (withoutSku?: boolean, withoutTitle?: boolean) => {
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

export const getProductColumnMenuValue = (columnType?: ProductColumnMenuType, isSimpleSku?: boolean) => [
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
        : isSimpleSku
        ? 'sku'
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
