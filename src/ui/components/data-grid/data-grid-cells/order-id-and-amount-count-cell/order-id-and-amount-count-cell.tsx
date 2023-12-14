import React, { FC } from 'react'

import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'

import { useStyles } from './order-id-and-amount-count-cell.style'

interface OrderIdAndAmountCountCellProps {
  orderId: string
  amount: number
  onClickOrderId: () => void
}

export const OrderIdAndAmountCountCell: FC<OrderIdAndAmountCountCellProps> = React.memo(
  ({ orderId, amount, onClickOrderId }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.orderIdAndAmountCount}>
        <p className={styles.multilineLink} onClick={onClickOrderId}>
          {orderId}
        </p>
        {amount >= 1 && (
          <div className={styles.amountWithClocks}>
            <WatchLaterSharpIcon /> {amount}
          </div>
        )}
      </div>
    )
  },
)
