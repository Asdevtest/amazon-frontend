/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderCell } from '..'
import { FC, memo } from 'react'

import { useStyles } from './many-items-price-cell.style'

interface ManyItemsPriceCellProps {
  params: any
  withoutSku?: boolean
  withQuantity?: boolean
  withoutAsin?: boolean
}

export const ManyItemsPriceCell: FC<ManyItemsPriceCellProps> = memo(
  ({ params, withoutSku, withQuantity, withoutAsin }) => {
    const { classes: styles } = useStyles()

    const cell = params?.items?.map((el: any, itemIndex: number) => (
      <OrderCell
        key={itemIndex}
        withoutSku={withoutSku}
        withQuantity={withQuantity}
        withoutAsin={withoutAsin}
        box={params}
        product={el?.product}
        superbox={params.amount > 1 && params.amount}
        itemAmount={el.amount}
      />
    ))

    return <div className={styles.ManyItemsPriceCellMainWrapper}>{cell}</div>
  },
)
