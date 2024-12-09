import { action, computed } from 'mobx'

import { IShop } from '@typings/models/shops/shop'

export const shopsSelectConfig = {
  items: computed,
  onDropdownVisibleChange: action.bound,
}

export const generateItems = (data: IShop[]) => {
  const generatedUsetOptions = data?.map(item => ({
    value: item?._id,
    label: item?.name,
  }))

  return generatedUsetOptions
}
