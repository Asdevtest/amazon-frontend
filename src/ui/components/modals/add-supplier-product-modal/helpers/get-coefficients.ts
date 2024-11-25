import { inchesCoefficient, poundsWeightCoefficient } from '@constants/configs/sizes-settings'

import { Dimensions } from '@typings/enums/dimensions'

export const getCoefficients = (dimensionType: Dimensions) => {
  const isUSDimension = dimensionType === Dimensions.US

  const multiplier = isUSDimension ? 1 / inchesCoefficient : inchesCoefficient
  const weightMultiplier = isUSDimension ? 1 / poundsWeightCoefficient : poundsWeightCoefficient

  return {
    multiplier,
    weightMultiplier,
  }
}
