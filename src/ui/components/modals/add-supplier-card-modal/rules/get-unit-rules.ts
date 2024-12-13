import { Rule } from 'antd/es/form'

import { Dimensions } from '@typings/enums/dimensions'

export const getUnitRules = (): Rule[] => [
  ({ getFieldsValue }) => ({
    validator(_, value) {
      const values = getFieldsValue(['heightUnit', 'widthUnit', 'lengthUnit', 'weighUnit', 'unitDimensionType'])

      const { lengthUnit, widthUnit, heightUnit, weighUnit, unitDimensionType } = values

      const isSomeUnitFilled = lengthUnit || widthUnit || heightUnit || weighUnit

      const maxWeight = unitDimensionType === Dimensions.EU ? 120 : 47.24

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
