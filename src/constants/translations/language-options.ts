import { LanguageKey } from './language-key'

export interface LanguageOption {
  key: LanguageKey
  label: string
}

export const languageOptions: LanguageOption[] = [
  {
    key: LanguageKey.en,
    label: 'English',
  },
  {
    key: LanguageKey.ru,
    label: 'Русский',
  },

  {
    key: LanguageKey.zh,
    label: '中国',
  },
]
