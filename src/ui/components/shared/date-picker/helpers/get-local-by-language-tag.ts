import enLocale from 'date-fns/locale/en-US'
import ruLocale from 'date-fns/locale/ru'
import uaLocale from 'date-fns/locale/uk'
import zhLocale from 'date-fns/locale/zh-CN'

import { LanguageKey } from '@typings/enums/language-key'

export const getLocalByLanguageTag = (languageTag: LanguageKey) => {
  switch (languageTag) {
    case LanguageKey.ru:
      return ruLocale

    case LanguageKey.en:
      return enLocale

    case LanguageKey.zh:
      return zhLocale

    case LanguageKey.ua:
      return uaLocale

    default:
      return enLocale
  }
}
