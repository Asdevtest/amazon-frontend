/* eslint-disable @typescript-eslint/no-var-requires */
import { LanguageKey } from '@typings/enums/language-key'

import { TranslationKey } from './translation-key'

export const translationGetters = {
  [LanguageKey.en]: (): Record<TranslationKey, string> =>
    require('./translations-files/en.json') as Record<TranslationKey, string>,
  [LanguageKey.ru]: (): Record<TranslationKey, string> =>
    require('./translations-files/ru.json') as Record<TranslationKey, string>,
  [LanguageKey.zh]: (): Record<TranslationKey, string> =>
    require('./translations-files/zh.json') as Record<TranslationKey, string>,
  [LanguageKey.ua]: (): Record<TranslationKey, string> =>
    require('./translations-files/ua.json') as Record<TranslationKey, string>,
}
