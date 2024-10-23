import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export enum BoxTabs {
  BOX_INFO,
  ORDER_INFO,
}

export const switcherSettings = () => [
  {
    label: t(TranslationKey['Box info']),
    value: BoxTabs.BOX_INFO,
  },

  {
    label: t(TranslationKey['Order info']),
    value: BoxTabs.ORDER_INFO,
  },
]
