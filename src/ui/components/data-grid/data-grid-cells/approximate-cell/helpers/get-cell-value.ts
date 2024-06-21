import { toFixed } from '@utils/text'

import { IDestinationVariationWithCalculations } from '@typings/shared/destinations'

export const getCellValue = (field: string, destination: IDestinationVariationWithCalculations) => {
  switch (field) {
    case 'destinationName':
      return destination?.destination?.name
    case 'costUnitWithDeliveryToUsa':
      return toFixed(destination?.destination?.costUnitWithDeliveryToUsa, 2)
    case 'roi':
      return toFixed(destination?.destination?.roi, 2)
    case 'pricePerKgUsd':
      return toFixed(destination?.[field], 2)
    case 'pricePerKgRmb':
      return toFixed(destination?.[field], 2)
    default:
      // @ts-ignore
      return destination?.[field]
  }
}
