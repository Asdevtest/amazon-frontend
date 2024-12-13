import { Rule } from 'antd/es/form'

import { Dimensions } from '@typings/enums/dimensions'

export const getBoxDimentionsRules = (): Rule[] => [
  ({ getFieldValue }) => ({
    validator(_, value) {
      const boxProperties = getFieldValue('boxProperties')
      const multiplicity = getFieldValue('multiplicity')

      if (!boxProperties) {
        return Promise.resolve()
      }

      const { boxHeightCm, boxWidthCm, boxLengthCm, amountInBox, boxWeighGrossKg, dimensionType } = boxProperties

      const maxWeight = dimensionType === Dimensions.EU ? 120 : 47.24

      const isSomeUnitFilled =
        boxHeightCm || boxWidthCm || boxLengthCm || amountInBox || boxWeighGrossKg || multiplicity

      if (value > maxWeight) {
        return Promise.reject('')
      }

      if (isSomeUnitFilled && !value) {
        return Promise.reject('')
      }

      return Promise.resolve()
    },
  }),
]
