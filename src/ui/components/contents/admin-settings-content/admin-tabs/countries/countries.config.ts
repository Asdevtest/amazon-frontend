import { Rule } from 'antd/es/form'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export interface CountryValues {
  title: string
  shortTitle: string
  image: string
  id?: string
}

export const generateFieldRules = (message: string): Rule[] => [
  { required: true, message: t(TranslationKey[message as TranslationKey]) },
  () => ({
    validator(_, value) {
      if (!value?.trim()) {
        return Promise.reject()
      }

      return Promise.resolve()
    },
  }),
]

export const generateCountryIconRules = (): Rule[] => [
  { required: true, message: t(TranslationKey['Country icon is required']) },
]
