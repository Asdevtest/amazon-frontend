import { Dimensions } from '@typings/enums/dimensions'

export const sizeSwitcherSettings = [
  { label: () => Dimensions[Dimensions.EU], value: Dimensions.EU },
  { label: () => Dimensions[Dimensions.US], value: Dimensions.US },
]
