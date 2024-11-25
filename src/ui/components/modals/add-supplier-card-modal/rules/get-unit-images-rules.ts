import { Rule } from 'antd/es/form'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getUnitImagesRules = (): Rule[] => [
  ({ getFieldsValue }) => ({
    validator(_, value) {
      const values = getFieldsValue(['heightUnit', 'widthUnit', 'lengthUnit', 'weighUnit'])

      const { lengthUnit, widthUnit, heightUnit, weighUnit } = values

      const isSomeUnitFilled = lengthUnit || widthUnit || heightUnit || weighUnit

      if (isSomeUnitFilled && (!value || value.length < 4)) {
        return Promise.reject(t(TranslationKey['Add at least 4 photos']))
      }

      return Promise.resolve()
    },
  }),
]
