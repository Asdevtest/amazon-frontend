import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getRequiredRules = () => [{ required: true, message: t(TranslationKey['Please input your name!']) }]

export const getRequiredLinkRules = () => [
  { required: true, message: t(TranslationKey['Please input your link!']) },
  {
    pattern: /^(https?|ftp):\/\/(([a-z0-9]+:[a-z0-9]+)@)?([a-z0-9-]+\.)+[a-z\u00a1-\uffff]{2,}(:[0-9]{1,5})?(\/.*)?$/i,
    message: t(TranslationKey['Please enter a valid URL!']),
  },
]
