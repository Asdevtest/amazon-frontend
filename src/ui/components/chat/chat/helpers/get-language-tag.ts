import { LanguageKey } from '@typings/enums/language-key'

export const getLanguageTag = (languageTag: LanguageKey) => {
  switch (languageTag) {
    case LanguageKey.ru:
      return 'ru'
    case LanguageKey.zh:
      return 'zh'
    case LanguageKey.ua:
      return 'uk'
    default:
      return 'en'
  }
}
