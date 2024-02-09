import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { SwitcherConditions } from './gallery-request-modal.type'

export const customSwitcherSettings = [
  { label: () => t(TranslationKey.Photos), value: SwitcherConditions.MEDIA_FILES },
  { label: () => t(TranslationKey.Documents), value: SwitcherConditions.DOCUMENTS },
]
