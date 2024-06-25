import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getPaymentTypeConfig = () => [
  {
    label: () => t(TranslationKey.All),
    value: '',
  },
  {
    label: () => t(TranslationKey.Replenish),
    value: 'REPLENISH',
  },
  {
    label: () => t(TranslationKey.Fine),
    value: 'FINE',
  },
]
