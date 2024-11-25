import { volumePoundsWeightCoefficient } from '@constants/configs/sizes-settings'

import { Dimensions } from '@typings/enums/dimensions'

export const getVolumeCoefficient = (sizeSetting: Dimensions, volumeWeightCoefficient: number) =>
  sizeSetting === Dimensions.EU ? volumeWeightCoefficient : volumePoundsWeightCoefficient
