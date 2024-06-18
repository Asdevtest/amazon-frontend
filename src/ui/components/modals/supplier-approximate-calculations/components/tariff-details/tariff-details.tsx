import { Checkbox, Tooltip } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { TooltipInfoIcon } from '@components/shared/svg-icons'

import { formatDateWithoutTime } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ILogicTariff } from '@typings/shared/logic-tariff'

import { useStyles } from './tariff-details.style'

import { dateConfig } from './date.config'

interface TariffDetailsProps {
  tariff: ILogicTariff
}

export const TariffDetails: FC<TariffDetailsProps> = memo(
  ({
    tariff,
    currentVariationId,
    isTariffsSelect,
    initialDestinationId,
    isStrictVariationSelect,
    onClickChangeVariation,
  }) => {
    const { classes: styles, cx } = useStyles()

    const { name: title, description } = tariff

    return (
      <div className={styles.root}>
        <div className={styles.tariffDetails}>
          <p title={title} className={cx(styles.tariffTitle, styles.tariffDescription)}>
            {title || t(TranslationKey.Missing)}
          </p>
          {description ? (
            <p title={description} className={styles.tariffDescription}>
              {description}
            </p>
          ) : null}
        </div>

        <div className={styles.destinationVariationsWrapper}>
          {tariff.destinationVariations?.map(variation => {
            const isActiveSelectedVariation = variation?._id === currentVariationId
            const destinationId = variation?.destination?._id

            const minWeight = variation?.minWeight
            const maxWeight = variation?.maxWeight

            const weightText = `${minWeight} - ${maxWeight}`

            return (
              <div key={variation?._id} className={styles.destinationVariationWrapper}>
                <p className={styles.destinationName}>{variation.destination?.name}</p>

                <div className={cx(styles.destination, { [styles.withoutCheckbox]: !isTariffsSelect })}>
                  {isTariffsSelect ? (
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
                        })
                      }
                    />
                  ) : null}

                  <p title={weightText} className={styles.text}>
                    {weightText}
                  </p>
                </div>

                <p className={styles.price}>{toFixed(variation.pricePerKgRmb)}</p>

                <p className={styles.price}>{toFixed(variation.pricePerKgUsd)}</p>
              </div>
            )
          })}
        </div>

        <div className={styles.dateParamWrapper}>
          {dateConfig.map(({ param, icon, tooltipText }) => (
            <div key={param} className={styles.dateParam}>
              <div className={styles.iconWrapper}>
                {icon}

                <Tooltip arrow title={tooltipText} className={styles.tooltip}>
                  <div>
                    <TooltipInfoIcon />
                  </div>
                </Tooltip>
              </div>
              <p>{formatDateWithoutTime(tariff?.[param as keyof ILogicTariff])}</p>
            </div>
          ))}
        </div>

        <p className={styles.deliveryTime}>{tariff.deliveryTimeInDay}</p>

        <p className={styles.deliveryTime}>{toFixed(tariff.costUnitWithDeliveryToChina)}</p>

        <div className={styles.weightWrapper}>
          {tariff.destinationVariations?.map(variation => (
            <div key={variation?._id} className={styles.destinationVariationWrapper}>
              <p>{toFixed(variation?.destination?.costUnitWithDeliveryToUsa)}</p>

              <p>{toFixed(variation?.destination?.roi)}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
)
