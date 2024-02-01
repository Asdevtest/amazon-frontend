import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export enum SwitcherSetting {
  STANDARD = 'STANDARD',
  ADDITIONAL = 'ADDITIONAL',
}

export const switcherConfig = [
  { label: () => t(TranslationKey.Standardized), value: SwitcherSetting.STANDARD },
  { label: () => t(TranslationKey.Additional), value: SwitcherSetting.ADDITIONAL },
]
