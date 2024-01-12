import { zipCodeGroups } from '@constants/configs/zip-code-groups'

import { toFixed } from '@utils/text'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'

type regionOfDeliveryNameType = 'west' | 'central' | 'east'

export const useGetDestinationTariffInfo = (
  destinations: IDestination[],
  storekeepers: IDestinationStorekeeper[],
  destinationId: string | null,
  storekeeperId: string | null,
  logicsTariffId: string | null,
  variationTariffId: string | null,
) => {
  const curDestination = destinations?.find(el => el._id === destinationId)
  const firstNumOfCode = curDestination?.zipCode[0]
  const regionOfDeliveryName = zipCodeGroups?.find(el => el.codes.includes(Number(firstNumOfCode)))?.name
  const currentStorekeeper = storekeepers?.find(el => el?._id === storekeeperId)
  const currentLogicsTariff = currentStorekeeper?.tariffLogistics?.find(el => el?._id === logicsTariffId)
  const currentTariff = currentStorekeeper?.tariffLogistics?.find(el => el?._id === logicsTariffId)

  const tariffName = currentLogicsTariff?.name
  const tariffRate = toFixed(
    currentLogicsTariff?.conditionsByRegion[regionOfDeliveryName as regionOfDeliveryNameType]?.rate ||
      currentLogicsTariff?.destinationVariations?.find(el => el._id === variationTariffId)?.pricePerKgUsd,
    2,
  )

  return {
    tariffName,
    tariffRate,
    currentTariff,
  }
}
