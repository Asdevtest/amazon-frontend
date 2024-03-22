import Bowser from 'bowser'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getBrowserAndVersion = (userAgent: string): string => {
  const browser = Bowser.getParser(userAgent).getBrowser()

  console.log('browser', browser)

  if (!browser) {
    return t(TranslationKey['Browser not found'])
  }

  return `${browser?.name} (${browser?.version})`
}
