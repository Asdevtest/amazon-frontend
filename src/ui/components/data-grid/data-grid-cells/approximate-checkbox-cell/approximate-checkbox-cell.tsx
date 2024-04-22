import { FC, memo } from 'react'

import { Checkbox } from '@components/shared/checkbox'

import { IDestinationVariationWithCalculations } from '@typings/shared/destinations'

import { useStyles } from './approximate-checkbox-cell.style'

interface ApproximateCheckboxCellProps {
  variations: IDestinationVariationWithCalculations[]
  currentVariationId: string
  currentDestinationId: string
  isStrictVariationSelect: boolean
  onClickChangeVariation: (variationId: string, destinationId: string, logicsTariffId: string) => void
}

export const ApproximateCheckboxCell: FC<ApproximateCheckboxCellProps> = memo(
  ({ variations, currentVariationId, currentDestinationId, isStrictVariationSelect, onClickChangeVariation }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.wrapper}>
        {variations?.length
          ? variations.map((variation, index) => (
              <div key={index} className={styles.destination}>
                <Checkbox
                  checked={variation?._id === currentVariationId}
                  disabled={
                    variation?.destination?._id !== currentDestinationId &&
                    isStrictVariationSelect &&
                    !!currentDestinationId
                  }
                  onChange={() =>
                    onClickChangeVariation(
                      variation?._id,
                      variation?.destination?._id,
                      variation?.storekeeperTariffLogisticsId,
                    )
                  }
                />
              </div>
            ))
          : null}
      </div>
    )
  },
)
