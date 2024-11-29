import { Rule } from 'antd/es/form'

export const getBoxDimentionsRules = (): Rule[] => [
  ({ getFieldValue }) => ({
    validator(_, value) {
      const boxProperties = getFieldValue('boxProperties')
      const multiplicity = getFieldValue('multiplicity')

      if (!boxProperties) {
        return Promise.resolve()
      }

      const { boxHeightCm, boxWidthCm, boxLengthCm, amountInBox, boxWeighGrossKg } = boxProperties

      const isSomeUnitFilled =
        boxHeightCm || boxWidthCm || boxLengthCm || amountInBox || boxWeighGrossKg || multiplicity

      if (isSomeUnitFilled && !value) {
        return Promise.reject('')
      }

      return Promise.resolve()
    },
  }),
]
