import { Rule } from 'antd/es/form'

export const getMaxProductionTermRules = (): Rule[] => [
  ({ getFieldValue }) => ({
    validator(_, value) {
      const mixTerm = getFieldValue('minProductionTerm')

      if (mixTerm === undefined || value >= mixTerm) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
  }),
]
