import en from 'antd/locale/en_US'
import ru from 'antd/locale/ru_RU'
import uk from 'antd/locale/uk_UA'
import zh from 'antd/locale/zh_CN'

import { LanguageKey } from '@typings/enums/language-key'

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
    key: LanguageKey.ua,
    label: 'Український',
  },
  {
    key: LanguageKey.zh,
    label: '中国',
  },
]

export const gerAntLocale = (lang: LanguageKey) => {
  let antLocale

  switch (lang) {
    case 'ru':
      antLocale = ru
      break
    case 'ua':
      antLocale = uk
      break
    case 'en':
      antLocale = en
      break
    case 'ch':
      antLocale = zh
      break
    default:
      antLocale = en
  }

  return antLocale
}
