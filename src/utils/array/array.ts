/* eslint-disable import/no-unresolved */
import { DestinationVariationApproximateCalculationsType } from '../../types/destination'

export const getGroupDataByDestinationId = (
  destinationVariations: Array<DestinationVariationApproximateCalculationsType>,
): Record<string, Array<DestinationVariationApproximateCalculationsType>> => {
  return destinationVariations.reduce(
    (groups: Record<string, Array<DestinationVariationApproximateCalculationsType>>, obj) => {
      const destinationId = obj?.destination?._id

      if (!destinationId) {
        return groups
      }

      if (!groups[destinationId]) {
        groups[destinationId] = []
      }
      groups[destinationId].push(obj)
      return groups
    },
    {},
  )
}
