import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { MyOrderModalSwitcherConditions } from './tabs.type'

export const customSwitcherSettings = [
  { label: () => t(TranslationKey['Basic information']), value: MyOrderModalSwitcherConditions.BASIC_INFORMATION },
  { label: () => t(TranslationKey['List of suppliers']), value: MyOrderModalSwitcherConditions.LIST_O_FSUPPLIERS },
  { label: () => t(TranslationKey['Boxes to order']), value: MyOrderModalSwitcherConditions.BOXES_TO_ORDER },
]
