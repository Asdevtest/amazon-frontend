import { BaseOptionType } from 'antd/es/select'
import { action, computed } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

export const selectConfig = {
  asinOptions: computed,
  onDropdownVisibleChange: action.bound,
}

export const getOptions = (data: IProduct[]) => {
  const generatedOptions = data?.map(item => ({
    ...item,
    value: item?._id,
    label: item?.asin,
  }))
  const defaultOption = { value: null, label: t(TranslationKey['Select ASIN']) }

  return [defaultOption, ...generatedOptions]
}

export const getDefaultOption = (data?: BaseOptionType) => {
  if (data) {
    return {
      ...data,
      value: data?._id,
      label: data?.asin,
    }
  }

  return undefined
}

export type IChangeData = (data: BaseOptionType) => void
