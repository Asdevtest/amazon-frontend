import { FC, memo } from 'react'

import { IVariationParams } from '@components/modals/supplier-approximate-calculations/supplier-approximate-calculations.type'
import { Checkbox } from '@components/shared/checkbox'

import { IDestinationVariationWithCalculations } from '@typings/shared/destinations'

import { useStyles } from './approximate-checkbox-cell.style'

interface ApproximateCheckboxCellProps {
  variations: IDestinationVariationWithCalculations[]
  currentVariationId?: string
  currentDestinationId?: string
  isStrictVariationSelect?: boolean
  onClickChangeVariation: ({ variationId, destinationId, logicsTariffId }: IVariationParams) => void
}

export const ApproximateCheckboxCell: FC<ApproximateCheckboxCellProps> = memo(props => {
  const { variations, currentVariationId, currentDestinationId, isStrictVariationSelect, onClickChangeVariation } =
    props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {variations?.length
        ? variations.map((variation, index) => {
            const isActiveSelectedVariation = variation?._id === currentVariationId
            const destinationId = variation?.destination?._id

            return (
              <div key={index} className={styles.destination}>
                <Checkbox
                  checked={isActiveSelectedVariation}
                  disabled={destinationId !== currentDestinationId && isStrictVariationSelect && !!currentDestinationId}
                  onChange={() =>
                    onClickChangeVariation(
                      isActiveSelectedVariation
                        ? {
                            variationId: '',
                            destinationId,
                            logicsTariffId: '',
                          }
                        : {
                            variationId: variation?._id,
                            destinationId,
                            logicsTariffId: variation?.storekeeperTariffLogisticsId,
                          },
                    )
                  }
                />
              </div>
            )
          })
        : null}
    </div>
  )
})
