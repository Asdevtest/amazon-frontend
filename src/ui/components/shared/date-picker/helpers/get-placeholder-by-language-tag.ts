import { LanguageKey } from '@typings/enums/language-key'

export const getPlaceholderByLanguageTag = (languageTag: LanguageKey) => {
  switch (languageTag) {
    case LanguageKey.ru:
      return 'дд.мм.гггг'

    case LanguageKey.en:
      return 'dd/mm/yyyy'

    default:
      return 'dd/mm/yyyy'
  }
}
