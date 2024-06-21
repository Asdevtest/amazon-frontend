import Bowser from 'bowser'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getBrowserAndVersion = (userAgent: string): string => {
  const browser = Bowser.getParser(userAgent).getBrowser()
  const os = Bowser.getParser(userAgent).getOS()

  if (browser) {
    return `${os?.name} ${os?.versionName ? os?.versionName : ''}, ${browser?.name} (${browser?.version})`
  }

  return t(TranslationKey['Browser not found'])
}
