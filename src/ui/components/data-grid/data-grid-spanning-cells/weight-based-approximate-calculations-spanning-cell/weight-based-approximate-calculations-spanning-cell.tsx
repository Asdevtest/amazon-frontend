import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { getGroupDataByDestinationId } from '@utils/array'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IDestinationVariationApproximateCalculations } from '@typings/destination'

import { useStyles } from './weight-based-approximate-calculations-spanning-cell.style'

interface WeightBasedApproximateCalculationsSpanningCellProps {
  destinationVariations: IDestinationVariationApproximateCalculations[]
  costDeliveryToChina: number
  destinationVariationWidth: number
  weightWrapperWidth: number
  chinaCostWrapperWidth: number
  usaCostWrapperWidth: number
  roiWrapperWidth: number
}

export const WeightBasedApproximateCalculationsSpanningCell: FC<WeightBasedApproximateCalculationsSpanningCellProps> =
  memo(props => {
    const { classes: styles, cx } = useStyles()

    const {
      destinationVariations,
      costDeliveryToChina,
      destinationVariationWidth,
      weightWrapperWidth,
      chinaCostWrapperWidth,
      usaCostWrapperWidth,
      roiWrapperWidth,
    } = props

    const groupedData = getGroupDataByDestinationId(destinationVariations?.length ? destinationVariations : [])

    const arrayOfArrays = Object?.values(groupedData)

    return (
      <div className={styles.destinationVariationsWrapper}>
        {arrayOfArrays.map((varians, itemIndex) => (
          <div
            key={itemIndex}
            className={cx(styles.destinationVariationWrapper, {
              [styles.noBorder]: itemIndex === arrayOfArrays?.length - 1,
            })}
          >
            <div
              style={{ width: destinationVariationWidth }}
              className={cx(styles.destinationWrapper, styles.destinationVariation)}
            >
              <p className={cx(styles.destinationVariationText)}>
                {varians[0]?.destination?.name || t(TranslationKey.Missing)}
              </p>
            </div>
            <div style={{ width: weightWrapperWidth }} className={cx(styles.destinationWrapper)}>
              {varians.map((variant, variantIndex) => (
                <div key={variantIndex} className={styles.variantWrapper}>
                  <p className={cx(styles.destinationVariationText)}>{`${
                    !!variant.minWeight && t(TranslationKey.From) + ' '
                  }${variant.minWeight} ${!!variant.maxWeight && t(TranslationKey.To) + ' '}${variant.maxWeight}`}</p>
                </div>
              ))}
            </div>

            <div style={{ width: chinaCostWrapperWidth }} className={cx(styles.alignCenter)}>
              <p className={cx(styles.destinationVariationText)}>{toFixed(costDeliveryToChina, 2)}</p>
            </div>

            <div style={{ width: usaCostWrapperWidth }} className={cx(styles.destinationWrapper)}>
              {varians.map((variant, variantIndex) => (
                <p key={variantIndex} className={cx(styles.destinationVariationText)}>
                  {toFixed(variant.costDeliveryToUsa, 2)}
                </p>
              ))}
            </div>

            <div style={{ width: roiWrapperWidth }} className={cx(styles.destinationWrapper)}>
              {varians.map((variant, variantIndex) => (
                <p key={variantIndex} className={cx(styles.destinationVariationText)}>
                  {toFixed(variant.roi, 2) + ' %'}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  })
