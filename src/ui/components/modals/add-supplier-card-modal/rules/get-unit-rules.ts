import { Rule } from 'antd/es/form'

export const getUnitRules = (): Rule[] => [
  ({ getFieldsValue }) => ({
    validator(_, value) {
      const values = getFieldsValue(['heightUnit', 'widthUnit', 'lengthUnit', 'weighUnit', 'unitDimensionType'])

      const { lengthUnit, widthUnit, heightUnit, weighUnit } = values

      const isSomeUnitFilled = lengthUnit || widthUnit || heightUnit || weighUnit

      if (isSomeUnitFilled && !value) {
        return Promise.reject('')
      }

      return Promise.resolve()
    },
  }),
]
