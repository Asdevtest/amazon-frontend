import {Typography} from '@mui/material'

import React, {FC} from 'react'

import {Link} from 'react-router-dom'

import {OrdersUpdatesNotificationItem} from '@components/snacks/orders-updates-notification/orders-updates-notification-types'
import {useOrdersUpdatesNotificationStyle} from '@components/snacks/orders-updates-notification/orders-updates-notification.styles'

interface OrdersUpdatesNotificationRowProps {
  orders: OrdersUpdatesNotificationItem[]
  title: string
  idHref?: string
}

export const OrdersUpdatesNotificationRow: FC<OrdersUpdatesNotificationRowProps> = props => {
  const {classes: styles} = useOrdersUpdatesNotificationStyle()
  const {idHref, orders, title} = props

  return (
    <div className={styles.list}>
      <Typography className={styles.listTitle}>{title}</Typography>
      <ul className={styles.listWrapper}>
        {orders?.map(el => (
          <li key={el._id} className={styles.listItem}>
            <div>
              <span>ID:</span>{' '}
              {idHref ? (
                <Link to={`${idHref}/${el.id}`} target="_blank" rel="noreferrer">
                  {el.id}
                </Link>
              ) : (
                <>{el.id}</>
              )}
            </div>
            <div>
              <span>ASIN:</span> {el.product.asin}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
