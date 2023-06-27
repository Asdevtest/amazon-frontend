import i18n, { TranslateOptions } from 'i18n-js'
import memoize from 'lodash.memoize'

import { translationGetters } from '@constants/translations'
import { LanguageKey } from '@constants/translations/language-key'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

// allow to use dots in translation keys
i18n.defaultSeparator = '|'

i18n.translations = (
  Object.entries(translationGetters) as [LanguageKey, () => Record<TranslationKey, string>][]
).reduce(
  (acc, [languageTag, getTranslationFile]: [LanguageKey, () => Record<TranslationKey, string>]) => ({
    ...acc,
    [languageTag]: getTranslationFile(),
  }),
  {} as Record<LanguageKey, Record<TranslationKey, string>>,
)

export const t = memoize(
  (key: TranslationKey, config?: TranslateOptions): string => i18n.t(key, config),
  (key: TranslationKey, config?: TranslateOptions): string => (config ? key + JSON.stringify(config) : key),
)

const fallback: {
  languageTag: LanguageKey
  isRTL: boolean
} = { languageTag: LanguageKey.en, isRTL: false }

export const setI18nConfig = (): void => {
  if (!SettingsModel.languageTag) {
    const findBestAvailableLanguageResult = { languageTag: navigator.language } || fallback

    SettingsModel.setLanguageTag(findBestAvailableLanguageResult.languageTag)
  }

  if (t.cache.clear) {
    t.cache.clear()
  }

  if (SettingsModel.languageTag) {
    i18n.locale = SettingsModel.languageTag
  } else {
    i18n.locale = fallback.languageTag
  }
}
