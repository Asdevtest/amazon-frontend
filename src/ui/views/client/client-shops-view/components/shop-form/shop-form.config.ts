import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const requiredRules = [{ required: true, message: t(TranslationKey['Please input your name!']) }]

export const requiredLinkRules = [
  { required: true, message: t(TranslationKey['Please input your link!']) },
  {
    pattern: /^(https?:\/\/)?([a-z0-9]+[.])+[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i,
    message: t(TranslationKey['Please enter a valid URL!']),
  },
]

export const linkRules = [
  {
    pattern: /^(https?:\/\/)?([a-z0-9]+[.])+[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i,
    message: t(TranslationKey['Please enter a valid URL!']),
  },
]
