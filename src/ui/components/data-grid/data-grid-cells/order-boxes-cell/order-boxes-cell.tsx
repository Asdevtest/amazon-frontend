/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Text } from '@components/shared/text'

import { useStyles } from './order-boxes-cell.style'

import { OrderCell } from '../order-cell/order-cell'
import { OrderManyItemsCell } from '../order-many-items-cell/order-many-items-cell'

interface OrderBoxesCellProps {
  superbox: number
  superboxQty: number
  qty: number
  box: any
  product?: any
  withQuantity?: boolean
}

export const OrderBoxesCell: FC<OrderBoxesCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { superbox, superboxQty, qty, box, product, withQuantity } = props
  const value = qty * superboxQty

  return superbox ? (
    <div className={styles.orderBoxesWrapper}>
      <Text text={String(value)} />
      <OrderManyItemsCell box={box} />
    </div>
  ) : (
    <div className={styles.orderBoxesWrapper}>
      <OrderCell product={product} superbox={superboxQty} box={box} withQuantity={withQuantity} />
    </div>
  )
})
