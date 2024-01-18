import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { TabValue } from './chat-into.type'

export const getCustomSwitcherConfig = (isGroupChat?: boolean) => {
  const config = [
    { label: () => t(TranslationKey['Photo and Video']), value: TabValue.MEDIA },
    { label: () => t(TranslationKey.Files), value: TabValue.FILES },
  ]

  if (isGroupChat) {
    config.unshift({ label: () => t(TranslationKey.Members), value: TabValue.GROUP_CHAT_USERS })
  }

  return config
}
