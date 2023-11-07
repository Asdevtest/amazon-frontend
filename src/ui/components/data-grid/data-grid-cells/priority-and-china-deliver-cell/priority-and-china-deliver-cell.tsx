/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react'

import { orderPriority } from '@constants/orders/order-priority'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { requestPriority } from '@constants/requests/request-priority'

import { ClockIcon, FireIcon, TruckIcon } from '@components/shared/svg-icons'

import { useDataGridCellStyles } from './priority-and-china-deliver-cell.style'

import { OpenInNewTabCell } from '../data-grid-cells'

interface PriorityAndChinaDeliverCellProps {
  priority: number
  chinaDelivery?: boolean
  status?: number
  isRequest?: boolean
  onClickOpenInNewTab: () => void
}

export const PriorityAndChinaDeliverCell: FC<PriorityAndChinaDeliverCellProps> = React.memo(props => {
  const { classes: styles } = useDataGridCellStyles()
  const { priority, chinaDelivery, status, isRequest, onClickOpenInNewTab } = props

  // @ts-ignore
  const isPendingOrder = Number(status) <= Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])
  const isUrgent =
    Number(priority) === orderPriority.urgentPriority ||
    (isRequest && Number(priority) === requestPriority.urgentPriority)

  return (
    <div className={styles.priorityAndChinaDeliveryWrapper}>
      {onClickOpenInNewTab && <OpenInNewTabCell onClickOpenInNewTab={onClickOpenInNewTab} />}

      {isPendingOrder ? <ClockIcon className={styles.clockIcon} /> : null}

      <div className={styles.priorityAndChinaDelivery}>
        {isUrgent ? <FireIcon /> : null}

        {chinaDelivery === true ? <TruckIcon /> : null}
      </div>
    </div>
  )
})
