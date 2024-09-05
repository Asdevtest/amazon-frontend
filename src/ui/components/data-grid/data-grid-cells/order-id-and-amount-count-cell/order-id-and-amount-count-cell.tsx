import { FC, memo } from 'react'
import { MdOutlineWatchLater } from 'react-icons/md'

import { useStyles } from './order-id-and-amount-count-cell.style'

interface OrderIdAndAmountCountCellProps {
  orderId: string
  amount: number
  onClickOrderId: () => void
}

export const OrderIdAndAmountCountCell: FC<OrderIdAndAmountCountCellProps> = memo(
  ({ orderId, amount, onClickOrderId }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.orderIdAndAmountCount}>
        <p className={styles.multilineLink} onClick={onClickOrderId}>
          {orderId}
        </p>
        {amount >= 1 && (
          <div className={styles.amountWithClocks}>
            <MdOutlineWatchLater size={20} /> {amount}
          </div>
        )}
      </div>
    )
  },
)
