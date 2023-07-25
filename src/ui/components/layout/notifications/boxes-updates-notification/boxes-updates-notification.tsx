import { format } from 'date-fns'
import { History } from 'history'
import React, { FC } from 'react'

import { Avatar, Link, Typography } from '@mui/material'

import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { useBoxNotificationStyles } from '@components/layout/notifications/boxes-updates-notification/boxes-updates-notification.styles'

import { t } from '@utils/translations'

export interface BoxProduct {
  _id: string
  asin: string
}

export interface BoxOrder {
  _id: string
  id: number
}

export interface BoxItems {
  productId: string
  product: BoxProduct
  order: BoxOrder
}

export interface NotificationItem {
  _id: string
  humanFriendlyId: number
  clientId: string
  items: BoxItems[]
}

interface BoxesUpdatesNotificationProps {
  history: History
  noticeItem: NotificationItem[] | null
}

export const BoxesUpdatesNotification: FC<BoxesUpdatesNotificationProps> = props => {
  const { classes: styles } = useBoxNotificationStyles()
  const { noticeItem, history } = props

  const goToBox = (boxId: number) => {
    history.push(`/client/warehouse/in-stock?search-text=${boxId}`)
  }

  const goToOrder = (id: string) => {
    history.push(`/client/my-orders/orders/order?orderId=${id}`)
  }

  const goToProduct = (id: string) => {
    history.push(`/client/inventory/product?product-id=${id}`)
  }

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <Avatar
          src={
            SettingsModel.uiTheme === UiTheme.light ? '/assets/icons/snack-light.svg' : '/assets/icons/snack-dark.svg'
          }
          className={styles.avatarWrapper}
        />

        <div className={styles.centerWrapper}>
          <Typography className={styles.attentionTitle}>{t(TranslationKey.Notice).toUpperCase()}</Typography>

          <ul className={styles.listWrapper}>
            {noticeItem?.map(el => (
              <li key={el._id}>
                <div className={styles.listItem}>
                  <p>
                    {t(TranslationKey['Box number:'])}{' '}
                    <Link onClick={() => goToBox(el.humanFriendlyId)}>{el.humanFriendlyId}</Link> <br />
                    {t(TranslationKey['Is accepted for processing']).toLowerCase()}
                  </p>
                  <div>
                    <p>
                      ASIN: <Link onClick={() => goToProduct(el.items[0].productId)}>{el.items[0].product.asin}</Link>
                    </p>
                  </div>
                  <div>
                    <p>
                      Order id: <Link onClick={() => goToOrder(el.items[0].order._id)}>{el.items[0].order.id}</Link>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.footer}>
        <Typography className={styles.messageDate}>{format(new Date(), 'HH:mm')}</Typography>
      </div>
    </div>
  )
}
