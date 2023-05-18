import { Link, Typography } from '@mui/material'

import React, { FC } from 'react'

import { History } from 'history'

import { OrdersUpdatesNotificationItem } from '@components/layout/notifications/orders-updates-notification/orders-updates-notification-types'
import { useOrdersUpdatesNotificationStyle } from '@components/layout/notifications/orders-updates-notification/orders-updates-notification.styles'

interface OrdersUpdatesNotificationRowProps {
  orders: OrdersUpdatesNotificationItem[]
  title: string
  idHref?: string
  history: History
}

export const OrdersUpdatesNotificationRow: FC<OrdersUpdatesNotificationRowProps> = props => {
  const { classes: styles } = useOrdersUpdatesNotificationStyle()
  const { idHref, orders, title, history } = props

  const goToHref = (id: string) => {
    if (!idHref) return
    history.push(`${idHref}`, { orderId: id })
  }

  return (
    <div className={styles.list}>
      <Typography className={styles.listTitle}>{title}</Typography>
      <ul className={styles.listWrapper}>
        {orders?.map(el => (
          <li key={el._id} className={styles.listItem}>
            <div>
              <span>ID:</span>{' '}
              {idHref ? (
                <Link underline="none" sx={{ cursor: 'pointer' }} onClick={() => goToHref(el._id)}>
                  {el.id}
                </Link>
              ) : (
                <>{el.id}</>
              )}
            </div>
            {el?.product?.asin && (
              <div>
                <span>ASIN:</span> {el.product.asin}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
