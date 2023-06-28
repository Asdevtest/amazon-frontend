import { Checkbox, Typography } from '@mui/material'

import React from 'react'

import { withStyles } from 'tss-react/mui'

import { toFixed } from '@utils/text'

import { styles } from './data-grid-spanning-cells.style'
import { cx } from '@emotion/css'
import { t } from '@utils/translations'
import { TranslationKey } from '@constants/translations/translation-key'

export const DestinationVariationsSpanningCell = React.memo(
  withStyles(
    ({
      classes: classNames,
      showCheckbox,
      destinationVariations,
      destinationData,
      activeDestinationId,
      activeDedestinationVariationt,
      selectVariationTariff,
      withoutRate,
    }) => {
      const groupedData = destinationVariations.reduce((groups, obj) => {
        const { destinationId } = obj
        if (!groups[destinationId]) {
          groups[destinationId] = []
        }
        groups[destinationId].push(obj)
        return groups
      }, {})

      const arrayOfArrays = Object.values(groupedData)

      return (
        <div className={classNames.destinationVariationsWrapper}>
          {arrayOfArrays.map((varians, itemIndex) => (
            <div
              key={itemIndex}
              className={cx(classNames.destinationVariationWrapper, {
                [classNames.noBorder]: itemIndex === arrayOfArrays?.length - 1,
              })}
            >
              <div className={cx(classNames.destinationWrapper, classNames.destinationVariation)}>
                <Typography className={cx(classNames.destinationVariationText)}>
                  {destinationData?.find(obj => obj?._id === varians[0]?.destinationId)?.name ||
                    t(TranslationKey.Missing)}
                </Typography>
              </div>
              <div className={cx(classNames.destinationWrapper, classNames.weightWrapper)}>
                {varians.map((variant, variantIndex) => (
                  <div key={variantIndex} className={classNames.variantWrapper}>
                    {!!showCheckbox && (
                      <Checkbox
                        disabled={activeDestinationId && activeDestinationId !== variant.destinationId}
                        checked={activeDedestinationVariationt === variant._id}
                        classes={{ root: classNames.checkboxRoot }}
                        onClick={() => selectVariationTariff(variant._id, variant.destinationId)}
                      />
                    )}
                    <Typography className={cx(classNames.destinationVariationText)}>{`${
                      !!variant.minWeight && t(TranslationKey.From) + ' '
                    }${variant.minWeight} ${!!variant.maxWeight && t(TranslationKey.To) + ' '}${
                      variant.maxWeight
                    }`}</Typography>
                  </div>
                ))}
              </div>
              {!withoutRate && (
                <div className={cx(classNames.destinationWrapper, classNames.rateWrapper)}>
                  {varians.map((variant, variantIndex) => (
                    <Typography key={variantIndex} className={cx(classNames.destinationVariationText)}>
                      {toFixed(variant.pricePerKgRmb, 2)}
                    </Typography>
                  ))}
                </div>
              )}

              {!withoutRate && (
                <div className={cx(classNames.destinationWrapper, classNames.rateWrapper)}>
                  {varians.map((variant, variantIndex) => (
                    <Typography key={variantIndex} className={cx(classNames.destinationVariationText)}>
                      {toFixed(variant.pricePerKgUsd, 2)}
                    </Typography>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    },
    styles,
  ),
)
