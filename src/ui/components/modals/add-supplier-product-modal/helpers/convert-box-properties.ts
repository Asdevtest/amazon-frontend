import { Dimensions } from '@typings/enums/dimensions'

import { getCoefficients } from './get-coefficients'

export const convertBoxProperties = (
  dimensionType: Dimensions,
  properties: {
    length: number
    width: number
    height: number
    weigh: number
  },
) => {
  const { multiplier, weightMultiplier } = getCoefficients(dimensionType)
  const { length, width, height, weigh } = properties

  return {
    length: length * multiplier || undefined,
    width: width * multiplier || undefined,
    height: height * multiplier || undefined,
    weigh: weigh * weightMultiplier || undefined,
  }
}
