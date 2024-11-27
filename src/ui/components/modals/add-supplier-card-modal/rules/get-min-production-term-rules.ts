import { Rule } from 'antd/es/form'

export const getMinProductionRermRules = (): Rule[] => [
  ({ getFieldValue }) => ({
    validator(_, value) {
      const maxTerm = getFieldValue('maxProductionTerm')

      if (maxTerm === undefined || value <= maxTerm) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
  }),
]
