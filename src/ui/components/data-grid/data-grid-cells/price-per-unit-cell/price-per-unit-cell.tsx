/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { toFixedWithDollarSign } from '@utils/text'

import { useStyles } from './price-per-unit-cell.style'

interface PricePerUnitCellProps {
  item: any
}

export const PricePerUnitCell: FC<PricePerUnitCellProps> = memo(({ item }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.pricesWrapper}>
      {item.items.map((el: any, index: number) => (
        <p key={index} className={styles.multilineText}>
          {toFixedWithDollarSign(el.order.totalPrice / el.order.amount, 2)}
        </p>
      ))}
    </div>
  )
})
