/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { useStyles } from './order-boxes-cell.style'

import { OrderCell, OrderManyItemsCell, SuperboxQtyCell } from '../data-grid-cells'

interface OrderBoxesCellProps {
  superbox: number
  superboxQty: number
  qty: number
  box: any
  product?: any
  withoutSku?: boolean
  withQuantity?: boolean
}

export const OrderBoxesCell: FC<OrderBoxesCellProps> = React.memo(props => {
  const { classes: styles } = useStyles()
  const { superbox, superboxQty, qty, box, product, withoutSku, withQuantity } = props

  return superbox ? (
    <div className={styles.orderBoxesWrapper}>
      <SuperboxQtyCell qty={qty} superbox={superboxQty} />
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
