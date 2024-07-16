import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export enum ProductColumnMenuType {
  DEFAULT = 'default',
  CHILD = 'child',
  PARENT = 'parent',
}

export interface ProductColumnMenuValueParams {
  columnType?: ProductColumnMenuType
  isSimpleSku?: boolean
  table?: DataGridFilterTables
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

export const getProductColumnMenuValue = ({ columnType, isSimpleSku, table }: ProductColumnMenuValueParams = {}) => [
  {
    field:
      columnType === ProductColumnMenuType.PARENT
        ? 'parentProductAsin'
        : columnType === ProductColumnMenuType.CHILD
        ? 'childProductAsin'
        : 'asin',
    table: table || DataGridFilterTables.PRODUCTS,
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
    table: table || DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.STRING,
  },
  {
    field:
      columnType === ProductColumnMenuType.PARENT
        ? 'parentProductAmazonTitle'
        : columnType === ProductColumnMenuType.CHILD
        ? 'childProductAmazonTitle'
        : 'amazonTitle',
    table: table || DataGridFilterTables.PRODUCTS,
    columnKey: ColumnMenuKeys.STRING,
  },
]
