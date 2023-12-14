import React, { FC } from 'react'

import Checkbox from '@mui/material/Checkbox'

import { TranslationKey } from '@constants/translations/translation-key'

import { getGroupDataByDestinationId } from '@utils/array'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IDestinationVariationApproximateCalculations } from '@typings/destination'

import { useStyles } from './destination-variations-spanning-cell.style'

interface DestinationVariationsSpanningCellProps {
  showCheckbox: boolean
  destinationVariations: IDestinationVariationApproximateCalculations[]
  activeDestinationId: string
  activeDedestinationVariationt: string
  selectVariationTariff: (variantId: string, variantDestinationId: string, isNotValidDestination: boolean) => void
  withoutRate?: boolean
  isRemovedDestinationRestriction?: boolean
}

export const DestinationVariationsSpanningCell: FC<DestinationVariationsSpanningCellProps> = React.memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    showCheckbox,
    destinationVariations,
    activeDestinationId,
    activeDedestinationVariationt,
    selectVariationTariff,
    withoutRate,
    isRemovedDestinationRestriction,
  } = props

  const groupedData = getGroupDataByDestinationId(destinationVariations?.length ? destinationVariations : [])

  const arrayOfArrays = Object?.values(groupedData) || []

  return (
    <div className={styles.destinationVariationsWrapper}>
      {arrayOfArrays.map((varians, itemIndex) => (
        <div
          key={itemIndex}
          className={cx(styles.destinationVariationWrapper, {
            [styles.noBorder]: itemIndex === arrayOfArrays?.length - 1,
          })}
        >
          <div className={cx(styles.destinationWrapper, styles.destinationVariation)}>
            <p className={cx(styles.destinationVariationText)}>
              {varians[0]?.destination?.name || t(TranslationKey.Missing)}
            </p>
          </div>
          <div className={cx(styles.destinationWrapper, styles.weightWrapper)}>
            {varians.map((variant, variantIndex) => {
              const isNotValidDestination = Boolean(
                activeDestinationId && activeDestinationId !== variant?.destination?._id,
              )

              return (
                <div key={variantIndex} className={styles.variantWrapper}>
                  {!!showCheckbox && (
                    <Checkbox
                      disabled={isNotValidDestination && !isRemovedDestinationRestriction}
                      checked={activeDedestinationVariationt === variant._id}
                      classes={{ root: styles.checkboxRoot }}
                      onClick={() =>
                        selectVariationTariff(variant._id, variant?.destination?._id, isNotValidDestination)
                      }
                    />
                  )}
                  <p className={cx(styles.destinationVariationText)}>{`${
                    !!variant.minWeight && t(TranslationKey.From) + ' '
                  }${variant.minWeight} ${!!variant.maxWeight && t(TranslationKey.To) + ' '}${variant.maxWeight}`}</p>
                </div>
              )
            })}
          </div>
          {!withoutRate && (
            <div className={cx(styles.destinationWrapper, styles.rateWrapper)}>
              {varians.map((variant, variantIndex) => (
                <p key={variantIndex} className={cx(styles.destinationVariationText)}>
                  {toFixed(variant.pricePerKgRmb, 2)}
                </p>
              ))}
            </div>
          )}

          {!withoutRate && (
            <div className={cx(styles.destinationWrapper, styles.rateWrapper)}>
              {varians.map((variant, variantIndex) => (
                <p key={variantIndex} className={cx(styles.destinationVariationText)}>
                  {toFixed(variant.pricePerKgUsd, 2)}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
})
