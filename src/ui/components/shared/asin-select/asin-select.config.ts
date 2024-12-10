import { action } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const selectConfig = {
  onGetData: action.bound,
}

export const getOptions = (data: IPermissionsData[]) =>
  data?.map(item => ({
    ...item,
    value: item?._id,
    label: item?.asin || t(TranslationKey.Missing),
  }))
