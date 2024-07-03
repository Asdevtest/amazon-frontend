import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { AdminExchangeStatuses, adminExchangeStatusesTranslations } from './admin-exchange.types'

export const getSwitcherConfig = () =>
  Object.values(AdminExchangeStatuses).map(status => ({
    label: () => t(TranslationKey[adminExchangeStatusesTranslations[status] as keyof typeof TranslationKey]),
    value: status,
  }))

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
