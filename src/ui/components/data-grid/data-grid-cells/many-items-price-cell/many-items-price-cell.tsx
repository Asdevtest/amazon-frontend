/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { useStyles } from './many-items-price-cell.style'

import { OrderCell } from '../data-grid-cells'

interface ManyItemsPriceCellProps {
  params: any
  withoutSku?: boolean
  withQuantity?: boolean
}

export const ManyItemsPriceCell: FC<ManyItemsPriceCellProps> = memo(({ params, withoutSku, withQuantity }) => {
  const { classes: styles } = useStyles()

  const cell = params?.items?.map((el: any, itemIndex: number) => (
    <OrderCell
      key={itemIndex}
      withoutSku={withoutSku}
      withQuantity={withQuantity}
      box={params}
      product={el?.product}
      superbox={params.amount > 1 && params.amount}
      itemAmount={el.amount}
    />
  ))

  return <div className={styles.ManyItemsPriceCellMainWrapper}>{cell}</div>
})
