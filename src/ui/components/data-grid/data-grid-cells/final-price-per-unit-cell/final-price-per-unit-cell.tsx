/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { getTariffRateForBoxOrOrder } from '@utils/calculation'
import { toFixedWithDollarSign } from '@utils/text'

import { useDataGridCellStyles } from './final-price-per-unit-cell.style'

interface FinalPricePerUnitCellProps {
  box: any
  boxFinalWeight: number
}

export const FinalPricePerUnitCell: FC<FinalPricePerUnitCellProps> = React.memo(({ box, boxFinalWeight }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.pricesWrapper}>
      {box.items.map((el: any, index: number) => (
        <p key={index} className={styles.multilineText}>
          {toFixedWithDollarSign(
            el.order.totalPrice / el.order.amount + (boxFinalWeight * getTariffRateForBoxOrOrder(box)) / el.amount,

            2,
          )}
        </p>
      ))}
    </div>
  )
})
