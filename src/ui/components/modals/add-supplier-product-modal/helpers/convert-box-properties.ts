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
    length: length * multiplier || 0,
    width: width * multiplier || 0,
    height: height * multiplier || 0,
    weigh: weigh * weightMultiplier || 0,
  }
}
