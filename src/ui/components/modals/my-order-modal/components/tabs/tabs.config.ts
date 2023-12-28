import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { SwitcherConditions } from './tabs.type'

export const customSwitcherSettings = [
  { label: () => t(TranslationKey['Basic information']), value: SwitcherConditions.BASIC_INFORMATION },
  { label: () => t(TranslationKey['List of suppliers']), value: SwitcherConditions.LIST_O_FSUPPLIERS },
  { label: () => t(TranslationKey['Boxes to order']), value: SwitcherConditions.BOXES_TO_ORDER },
]
