import { getDimensionsSizesType, getWeightSizesType } from '@constants/configs/sizes-settings'

import { TypeOfDimensions } from '../dimensions.type'

export const getDimensionLabel = (title: string, type: TypeOfDimensions, sizeSetting: string) => {
  switch (type) {
    case TypeOfDimensions.DIMENSION:
      return `${title}(${getDimensionsSizesType(sizeSetting)}):`
    case TypeOfDimensions.WEIGHT:
      return `${title}(${getWeightSizesType(sizeSetting)}):`
    default:
      return `${title}:`
  }
}
