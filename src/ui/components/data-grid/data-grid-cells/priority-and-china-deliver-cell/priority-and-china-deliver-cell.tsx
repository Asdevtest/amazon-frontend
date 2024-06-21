import { OpenInNewTabCell } from '..'
import { FC, memo } from 'react'

import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'

import { ClockIcon, FireIcon, TruckIcon } from '@components/shared/svg-icons'

import { OrderPriority } from '@typings/enums/order/order-priority'
import { RequestPriority } from '@typings/enums/request/request-priority'

import { useStyles } from './priority-and-china-deliver-cell.style'

interface PriorityAndChinaDeliverCellProps {
  priority: number
  chinaDelivery?: boolean
  status?: number
  isRequest?: boolean
  onClickOpenInNewTab: () => void
}

export const PriorityAndChinaDeliverCell: FC<PriorityAndChinaDeliverCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { priority, chinaDelivery, status, isRequest, onClickOpenInNewTab } = props

  const isPendingOrder =
    Number(status) <= Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT as keyof typeof OrderStatusByKey])
  const isUrgent =
    Number(priority) === OrderPriority.URGENT_PRIORITY ||
    (isRequest && Number(priority) === RequestPriority.urgentPriority)

  return (
    <div className={styles.priorityAndChinaDeliveryWrapper}>
      {onClickOpenInNewTab && <OpenInNewTabCell isFullSize onClickOpenInNewTab={onClickOpenInNewTab} />}

      {isPendingOrder ? <ClockIcon className={styles.clockIcon} /> : null}

      <div className={styles.priorityAndChinaDelivery}>
        {isUrgent ? <FireIcon /> : null}

        {chinaDelivery === true ? <TruckIcon /> : null}
      </div>
    </div>
  )
})
