import { MultilineTextCell } from '..'
import { FC, memo } from 'react'

import { useStyles } from './orders-ids-items-cell.style'

interface OrdersIdsItemsCellProps {
  value: string
}

export const OrdersIdsItemsCell: FC<OrdersIdsItemsCellProps> = memo(({ value }) => {
  const { classes: styles } = useStyles()
  const sortedValue = value?.split('item')
  const orderIds = sortedValue[0]
  const ordersItems = 'item' + sortedValue[1]

  return (
    <div className={styles.orderIdsItemsWrapper}>
      <MultilineTextCell text={orderIds} />
      <MultilineTextCell text={ordersItems} />
    </div>
  )
})
