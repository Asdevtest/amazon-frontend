import { ShopReportsTabsValues } from '@constants/tabs/shop-report'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const switcherConfig = [
  { label: () => 'PPC-Organic by Weeks', value: ShopReportsTabsValues.PPC },
  { label: () => 'Inventory Shipments', value: ShopReportsTabsValues.INVENTORY_SHIPMENTS },
  { label: () => 'Inventory', value: ShopReportsTabsValues.INVENTORY },
  { label: () => t(TranslationKey['Warehouse report']), value: ShopReportsTabsValues.STOCK_REPORT },
  { label: () => t(TranslationKey['Dashboard by goods/days']), value: ShopReportsTabsValues.GOODS_DAYS_REPORT },
]
