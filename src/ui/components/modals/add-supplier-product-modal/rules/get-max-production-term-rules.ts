import { Rule } from 'antd/es/form'

import { requiredRule } from '@config/form-rules/get-required-rules'

export const getMaxProductionTermRules = (): Rule[] => [
  requiredRule,
  ({ getFieldValue }) => ({
    validator(_, value) {
      const mixTerm = getFieldValue('minProductionTerm')

      if (mixTerm === undefined || value > mixTerm) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
  }),
]
