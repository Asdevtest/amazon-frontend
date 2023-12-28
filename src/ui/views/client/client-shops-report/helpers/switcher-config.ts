import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { TabsValues } from './tabs-value'

export const switcherConfig = [
  { label: () => t(TranslationKey['Warehouse report']), value: TabsValues.STOCK_REPORT },
  { label: () => t(TranslationKey['Dashboard by goods/days']), value: TabsValues.GOODS_DAYS_REPORT },

  { label: () => 'Inventory', value: TabsValues.INVENTORY },
  { label: () => 'PPC-Organic by Weeks', value: TabsValues.PPC },
  { label: () => 'Inventory Shipments', value: TabsValues.INVENTORY_SHIPMENTS },
]
