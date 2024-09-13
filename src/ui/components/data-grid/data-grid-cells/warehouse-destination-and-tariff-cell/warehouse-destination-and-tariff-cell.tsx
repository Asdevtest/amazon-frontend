/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { tariffTypes } from '@constants/keys/tariff-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
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

  const currentTariffName = tariffName ? `${tariffName}` : ''
  const currentTariffRate = tariffRate ? `/ ${toFixed(tariffRate)} $` : ''
  const shoWcurrentTariff = currentStorekeeper && (currentTariffName || currentTariffRate)

  return (
    <div className={styles.destinationAndTariffWrapper}>
      {/* @ts-ignore */}
      <WithSearchSelect
        // @ts-ignore
        disabled={disabled}
        width={'100%'}
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
        variant={ButtonVariant.OUTLINED}
        className={styles.tariffButton}
        onClick={() => {
          onClickSetTariff(boxesMy)
          setShowSelectionStorekeeperAndTariffModal()
        }}
      >
        {shoWcurrentTariff ? (
          <>
            <p className={styles.tafiffText}>{currentTariffName}</p>
            <p className={styles.tafiffText}>{currentTariffRate}</p>
          </>
        ) : (
          <p>{t(TranslationKey.Select)}</p>
        )}
      </Button>
    </div>
  )
})
