import { LanguageKey } from '@typings/enums/language-key'

export interface LanguageOption {
  label: string
  value: LanguageKey
}

export const languageOptions: LanguageOption[] = [
  {
    label: 'En',
    value: LanguageKey.en,
  },
  {
    label: 'Ru',
    value: LanguageKey.ru,
  },

  {
    label: '中国',
    value: LanguageKey.zh,
  },
]
