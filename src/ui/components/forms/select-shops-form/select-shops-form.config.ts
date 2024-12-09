import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'

export const shopsSelectConfig = {
  selectedShopId: observable,
  items: computed,
  onDropdownVisibleChange: action.bound,
  onSelectShop: action.bound,
}

export const generateItems = (data: IShop[]) => {
  const defaultOption = { value: null, label: t(TranslationKey['Not chosen']) }
  const generatedUsetOptions = data?.map(item => ({
    value: item?._id,
    label: item?.name,
  }))

  return [defaultOption, ...generatedUsetOptions]
}
