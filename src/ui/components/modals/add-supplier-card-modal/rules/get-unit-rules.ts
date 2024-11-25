import { Rule } from 'antd/es/form'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getUnitRules = (): Rule[] => [
  ({ getFieldsValue }) => ({
    validator(_, value) {
      const values = getFieldsValue(['heightUnit', 'widthUnit', 'lengthUnit', 'weighUnit'])

      const { lengthUnit, widthUnit, heightUnit, weighUnit } = values

      const isSomeUnitFilled = lengthUnit || widthUnit || heightUnit || weighUnit

      if (isSomeUnitFilled && !value) {
        return Promise.reject(t(TranslationKey['Fill in the field']))
      }

      return Promise.resolve()
    },
  }),
]
