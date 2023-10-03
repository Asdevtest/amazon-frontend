import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const tabs = {
  BOX_INFO: 0,
  ORDER_INFO: 1,
}

export const switcherSettings = [
  {
    label: () => t(TranslationKey['Box info']),
    value: tabs.BOX_INFO,
  },

  {
    label: () => t(TranslationKey['Order info']),
    value: tabs.ORDER_INFO,
  },
]
