import { Rule } from 'antd/es/form'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getBoxDimentionsRules = (): Rule[] => [
  ({ getFieldValue }) => ({
    validator(_, value) {
      const boxProperties = getFieldValue('boxProperties')

      const { boxHeightCm, boxWidthCm, boxLengthCm, amountInBox, boxWeighGrossKg } = boxProperties

      const isSomeUnitFilled = boxHeightCm || boxWidthCm || boxLengthCm || amountInBox || boxWeighGrossKg

      if (isSomeUnitFilled && !value) {
        return Promise.reject(t(TranslationKey['Fill in the field']))
      }

      return Promise.resolve()
    },
  }),
]
