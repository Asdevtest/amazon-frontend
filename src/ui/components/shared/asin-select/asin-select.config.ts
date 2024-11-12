import { BaseOptionType } from 'antd/es/select'
import { action } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const selectConfig = {
  onGetData: action.bound,
}

export const getOptions = (data: IPermissionsData[]) => {
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
