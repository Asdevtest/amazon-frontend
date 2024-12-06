import { RuleObject } from 'antd/es/form'
import { StoreValue } from 'antd/es/form/interface'

import { FilterOptionsType } from '@models/infinite-scroll-model/infinite-scroll.model'

export const minValueRules = () => [
  {
    validator(_: RuleObject, value: string) {
      if (!value || parseFloat(value) >= 0) {
        return Promise.resolve()
      }
      return Promise.reject()
    },
  },
]

export const maxValueRules = (fieldName: string) => [
  ({ getFieldValue }: { getFieldValue: StoreValue }) => ({
    validator(_: RuleObject, value: string) {
      const priceInUsdMin = getFieldValue(fieldName) || 0

      if (!value || parseFloat(value) >= parseFloat(priceInUsdMin)) {
        return Promise.resolve()
      }
      return Promise.reject()
    },
  }),
]

export const createFilterCondition = (
  key: string,
  operator: string,
  value: string | number | boolean,
): FilterOptionsType | null => (value ? { [key]: { [operator]: value } } : null)

export const getFilterOptions = (options: (FilterOptionsType | null)[]) => {
  const filterNullsOptions: FilterOptionsType[] = options.filter(option => option !== null)

  return filterNullsOptions?.reduce((acc: FilterOptionsType, filter: any) => {
    const key = Object.keys(filter)[0]

    if (!acc[key]) {
      acc[key] = {}
    }

    acc[key] = { ...acc[key], ...filter[key] }

    return acc
  }, {})
}
