import { Checkbox, Tooltip } from 'antd'
import { FC, memo } from 'react'

import { GridColumnVisibilityModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { TooltipInfoIcon } from '@components/shared/svg-icons'

import { formatDateWithoutTime } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ILogicTariff } from '@typings/shared/logic-tariff'

import { useStyles } from './tariff-details.style'

import { IVariationParams } from '../../supplier-approximate-calculations.type'

import { dateConfig } from './date.config'

interface TariffDetailsProps {
  tariff: ILogicTariff
  onClickChangeVariation: ({
    variationId,
    destinationId,
    logicsTariffId,
    variationMinBoxWeight,
  }: IVariationParams) => void
  currentVariationId?: string
  initialDestinationId?: string
  columnVisibilityModel?: GridColumnVisibilityModel
  isStrictVariationSelect?: boolean
  isHideCalculation?: boolean
  isTariffsSelect?: boolean
}

export const TariffDetails: FC<TariffDetailsProps> = memo(
  ({
    tariff,
    currentVariationId,
    isTariffsSelect,
    isHideCalculation,
    initialDestinationId,
    isStrictVariationSelect,
    columnVisibilityModel,
    onClickChangeVariation,
  }) => {
    const { classes: styles, cx } = useStyles()

    const { name: title, description } = tariff

    return (
      <div className={cx(styles.root, styles.borderBotton)}>
        {columnVisibilityModel?.name === false ? null : (
          <div className={cx(styles.tariffDetails, styles.borderBotton)}>
            <p title={title} className={cx(styles.tariffTitle, styles.tariffDescription)}>
              {title || t(TranslationKey.Missing)}
            </p>
            {description ? (
              <p title={description} className={styles.tariffDescription}>
                {description}
              </p>
            ) : null}
          </div>
        )}

        <div className={cx(styles.destinationVariationsWrapper, styles.borderRight, styles.borderLeft)}>
          {tariff.destinationVariations?.map(variation => {
            const isActiveSelectedVariation = variation?._id === currentVariationId
            const destinationId = variation?.destination?._id

            const minWeight = variation?.minWeight
            const maxWeight = variation?.maxWeight

            const weightText = `${minWeight} - ${maxWeight}`

            return (
              <div key={variation?._id} className={cx(styles.destinationVariationWrapper, styles.borderBotton)}>
                {columnVisibilityModel?.destinationName === false ? null : (
                  <p className={cx(styles.destinationName, styles.tariffDescription)}>{variation.destination?.name}</p>
                )}

                {columnVisibilityModel?.minWeight === false ? null : (
                  <div
                    className={cx(styles.destination, {
                      [styles.withoutCheckbox]: isHideCalculation || !isTariffsSelect,
                    })}
                  >
                    {isHideCalculation || !isTariffsSelect ? null : (
                      <Checkbox
                        checked={isActiveSelectedVariation}
                        disabled={
                          destinationId !== initialDestinationId && isStrictVariationSelect && !!initialDestinationId
                        }
                        onChange={() =>
                          onClickChangeVariation({
                            variationId: variation?._id,
                            destinationId,
                            logicsTariffId: variation?.storekeeperTariffLogisticsId,
                            variationMinBoxWeight: variation?.minBoxWeight,
                            pricePerKgUsd: variation?.pricePerKgUsd,
                          })
                        }
                      />
                    )}

                    <p title={weightText} className={styles.text}>
                      {weightText}
                    </p>
                  </div>
                )}

                {columnVisibilityModel?.pricePerKgRmb === false ? null : (
                  <p className={styles.price}>{toFixed(variation.pricePerKgRmb)}</p>
                )}

                {columnVisibilityModel?.pricePerKgUsd === false ? null : (
                  <p className={styles.price}>{toFixed(variation.pricePerKgUsd)}</p>
                )}
              </div>
            )
          })}
        </div>

        {columnVisibilityModel?.cls === false ? null : (
          <div className={cx(styles.dateParamWrapper, styles.borderBotton)}>
            {dateConfig.map(({ param, icon, tooltipText }) => (
              <div key={param} className={styles.dateParam}>
                <div className={styles.iconWrapper}>
                  {icon}

                  <Tooltip
                    arrow
                    title={t(TranslationKey[tooltipText as keyof typeof TranslationKey])}
                    className={styles.tooltip}
                  >
                    <div>
                      <TooltipInfoIcon />
                    </div>
                  </Tooltip>
                </div>
                <p>{formatDateWithoutTime(tariff?.[param as keyof ILogicTariff])}</p>
              </div>
            ))}
          </div>
        )}

        {columnVisibilityModel?.deliveryTimeInDay === false ? null : (
          <div className={cx(styles.deliveryTimeWrapper, styles.borderRight, styles.borderLeft, styles.borderBotton)}>
            <p>{tariff.deliveryTimeInDay}</p>
          </div>
        )}

        {isHideCalculation ? null : (
          <>
            {columnVisibilityModel?.costUnitWithDeliveryToChina === false ? null : (
              <div className={cx(styles.costUnitWrapper, styles.borderBotton)}>
                <p>{toFixed(tariff.costUnitWithDeliveryToChina)}</p>
              </div>
            )}

            <div className={cx(styles.weightWrapper)}>
              {tariff.destinationVariations?.map(variation => {
                const roi = Number(variation?.destination?.roi)
                const roiValue = toFixed(roi)

                return (
                  <div key={variation?._id} className={cx(styles.destinationVariationWrapper, styles.borderBotton)}>
                    {columnVisibilityModel?.costUnitWithDeliveryToUsa === false ? null : (
                      <div className={cx(styles.destinationCostUnitWrapper, styles.borderRight, styles.borderLeft)}>
                        <p>{toFixed(variation?.destination?.costUnitWithDeliveryToUsa)}</p>
                      </div>
                    )}

                    {columnVisibilityModel?.roi === false ? null : (
                      <div
                        className={cx(styles.destinationRoiWrapper, styles.borderRight, {
                          [styles.badRoi]: roi < 100,
                          [styles.normalRoi]: roi >= 100 && roi < 130,
                          [styles.goodRoi]: roi >= 130,
                        })}
                      >
                        <p title={roiValue}>{roiValue}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    )
  },
)
