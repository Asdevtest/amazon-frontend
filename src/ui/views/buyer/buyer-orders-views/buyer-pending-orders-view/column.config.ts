import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const productColumnMenuItems = [
  {
    label: () => t(TranslationKey.ASIN),
    value: 0,
  },
  {
    label: () => t(TranslationKey.SKU),
    value: 1,
  },
  {
    label: () => t(TranslationKey.Title),
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
    label: () => t(TranslationKey['Min. production time, days']),
    value: 0,
  },
  {
    label: () => t(TranslationKey['Max. production time, days']),
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
