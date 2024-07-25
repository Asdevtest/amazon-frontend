/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderCell, OrderManyItemsCell, TextCell } from '..'
import { FC, memo } from 'react'

import { useStyles } from './order-boxes-cell.style'

interface OrderBoxesCellProps {
  superbox: number
  superboxQty: number
  qty: number
  box: any
  product?: any
  withoutSku?: boolean
  withQuantity?: boolean
}

export const OrderBoxesCell: FC<OrderBoxesCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { superbox, superboxQty, qty, box, product, withoutSku, withQuantity } = props
  const value = qty * superboxQty

  return superbox ? (
    <div className={styles.orderBoxesWrapper}>
      <TextCell text={String(value)} />
      <OrderManyItemsCell box={box} withoutSku={withoutSku} />
    </div>
  ) : (
    <div className={styles.orderBoxesWrapper}>
      <OrderCell
        product={product}
        superbox={superboxQty}
        box={box}
        withoutSku={withoutSku}
        withQuantity={withQuantity}
      />
    </div>
  )
})
