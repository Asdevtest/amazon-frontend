import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ShopReportsTabsValues } from '@typings/enums/shop-report'

export const switcherConfig = [
  { label: () => 'PPC-Organic by day', value: ShopReportsTabsValues.PPC_ORGANIC_BY_DAY },
  { label: () => 'Inventory Shipments', value: ShopReportsTabsValues.INVENTORY_SHIPMENTS },
  { label: () => 'Inventory', value: ShopReportsTabsValues.INVENTORY },
  { label: () => 'Returns', value: ShopReportsTabsValues.RETURNS },
  { label: () => 'PPC-Organic by Weeks', value: ShopReportsTabsValues.PPC },
  { label: () => t(TranslationKey['Warehouse report']), value: ShopReportsTabsValues.STOCK_REPORT },
  { label: () => t(TranslationKey['Dashboard by goods/days']), value: ShopReportsTabsValues.GOODS_DAYS_REPORT },
]
