import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { MainRequestResultModalSwitcherConditions } from './tabs.type'

export const customSwitcherSettings = [
  { label: () => t(TranslationKey.Files), value: MainRequestResultModalSwitcherConditions.FILES },
  { label: () => t(TranslationKey.Links), value: MainRequestResultModalSwitcherConditions.LINKS },
  { label: () => t(TranslationKey.Remarks), value: MainRequestResultModalSwitcherConditions.REMARKS },
]
