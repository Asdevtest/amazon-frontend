import { action, computed } from 'mobx'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const requestSelectConfig = {
  items: computed,
  onGetData: action.bound,
  onScroll: action.bound,
  onDropdownVisibleChange: action.bound,
}

export const generateItems = (data: IPermissionsData[]) => {
  const generatedUsetOptions = data?.map(item => ({
    value: item?._id,
    label: item?.name,
  }))

  return generatedUsetOptions
}
