import { FC, memo } from 'react'

import { IVariationParams } from '@components/modals/supplier-approximate-calculations/supplier-approximate-calculations.type'
import { Checkbox } from '@components/shared/checkbox'

import { IDestinationVariationWithCalculations } from '@typings/shared/destinations'

import { useStyles } from './approximate-weight-cell.style'

interface ApproximateWeightCellProps {
  variations: IDestinationVariationWithCalculations[]
  onClickChangeVariation: ({ variationId, destinationId, logicsTariffId }: IVariationParams) => void
  currentVariationId?: string
  currentDestinationId?: string
  isStrictVariationSelect?: boolean
  isTariffsSelect: boolean
}

export const ApproximateWeightCell: FC<ApproximateWeightCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    isTariffsSelect,
    variations,
    currentVariationId,
    currentDestinationId,
    isStrictVariationSelect,
    onClickChangeVariation,
  } = props

  return (
    <div className={styles.wrapper}>
      {variations?.length
        ? variations.map((variation, index) => {
            const isActiveSelectedVariation = variation?._id === currentVariationId
            const destinationId = variation?.destination?._id

            const minWeight = variation?.minWeight
            const maxWeight = variation?.maxWeight

            const weightText = `${minWeight} - ${maxWeight}`

            return (
              <div key={index} className={cx(styles.destination, { [styles.withoutCheckbox]: !isTariffsSelect })}>
                {isTariffsSelect ? (
                  <Checkbox
                    checked={isActiveSelectedVariation}
                    disabled={
                      destinationId !== currentDestinationId && isStrictVariationSelect && !!currentDestinationId
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
            )
          })
        : null}
    </div>
  )
})
