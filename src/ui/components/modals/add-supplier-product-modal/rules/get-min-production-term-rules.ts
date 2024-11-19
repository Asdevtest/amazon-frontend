import { Rule } from 'antd/es/form'

import { requiredRule } from '@config/form-rules/get-required-rules'

export const getMinProductionRermRules = (): Rule[] => [
  requiredRule,
  ({ getFieldValue }) => ({
    validator(_, value) {
      const maxTerm = getFieldValue('maxProductionTerm')

      if (maxTerm === undefined || value < maxTerm) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
  }),
]
