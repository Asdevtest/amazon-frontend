/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { tariffTypes } from '@constants/keys/tariff-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IDestination } from '@typings/shared/destinations'

import { useStyles } from './warehouse-destination-and-tariff-cell.style'

interface WarehouseDestinationAndTariffCellProps {
  boxesMy: any
  destinations: IDestination[]
  destinationsFavourites: any[]
  setDestinationsFavouritesItem: any
  storekeepers: any[]
  onSelectDestination: any
  setShowSelectionStorekeeperAndTariffModal: any
  onClickSetTariff: any
  disabled: boolean
}

export const WarehouseDestinationAndTariffCell: FC<WarehouseDestinationAndTariffCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const {
    boxesMy,
    destinations,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    storekeepers,
    onSelectDestination,
    setShowSelectionStorekeeperAndTariffModal,
    onClickSetTariff,
    disabled,
  } = props

  const currentStorekeeper = storekeepers?.find(el => el._id === boxesMy?.storekeeper?._id)
  const currentTariff = currentStorekeeper?.tariffLogistics?.find((el: any) => el?._id === boxesMy?.logicsTariff?._id)

  const tariffName = currentTariff?.name

  const curDestination = destinations?.find(el => el?._id === boxesMy?.destination?._id)

  const firstNumOfCode = curDestination?.zipCode?.[0]
  const regionOfDeliveryName = zipCodeGroups?.find(el => el?.codes?.includes(Number(firstNumOfCode)))?.name || ''

  const tariffRate =
    currentTariff?.conditionsByRegion?.[regionOfDeliveryName]?.rate ||
    currentTariff?.destinationVariations?.find((el: any) => el._id === boxesMy?.variationTariff?._id)?.pricePerKgUsd

  return (
    <div className={styles.destinationAndTariffWrapper}>
      {/* @ts-ignore */}
      <WithSearchSelect
        // @ts-ignore
        disabled={disabled}
        width={160}
        selectedItemName={
          destinations.find(el => el?._id === boxesMy?.destination?._id)?.name || t(TranslationKey['Not chosen'])
        }
        data={
          boxesMy?.logicsTariff?._id && currentTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
            ? destinations.filter(el => el?._id === boxesMy?.variationTariff?.destinationId)
            : destinations.filter(el => el?.storekeeper?._id !== boxesMy?.storekeeper?._id)
        }
        searchFields={['name']}
        favourites={destinationsFavourites}
        onClickSetDestinationFavourite={setDestinationsFavouritesItem}
        onClickNotChosen={() =>
          onSelectDestination(boxesMy?._id, {
            destinationId: null,
          })
        }
        onClickSelect={(el: any) => onSelectDestination(boxesMy?._id, { destinationId: el?._id })}
      />
      <Button
        disabled={disabled}
        styleType={ButtonStyle.DEFAULT}
        className={styles.storekeeperBtn}
        onClick={(e: any) => {
          e.stopPropagation()
          onClickSetTariff(boxesMy)
          setShowSelectionStorekeeperAndTariffModal()
        }}
      >
        {boxesMy?.storekeeper?._id
          ? `${
              boxesMy?.storekeeper?._id
                ? `${tariffName ? tariffName : 'none'}${tariffRate ? ' / ' + toFixed(tariffRate, 2) + ' $' : ''}`
                : 'none'
            }`
          : t(TranslationKey.Select)}
      </Button>
    </div>
  )
})
