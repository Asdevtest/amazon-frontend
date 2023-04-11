import {Avatar, Typography} from '@mui/material'

import React, {FC} from 'react'

import {format} from 'date-fns'

import {UiTheme} from '@constants/themes'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {OrdersUpdatesNotificationRow} from '@components/snacks/orders-updates-notification/orders-updates-notification-row'
import {OrdersUpdatesNotificationItem} from '@components/snacks/orders-updates-notification/orders-updates-notification-types'
import {useOrdersUpdatesNotificationStyle} from '@components/snacks/orders-updates-notification/orders-updates-notification.styles'

import {t} from '@utils/translations'

interface OrdersUpdatesNotificationProps {
  noticeItem: {
    needConfirmOrders: OrdersUpdatesNotificationItem[]
    vacOrders: OrdersUpdatesNotificationItem[]
  } | null
}

export const OrdersUpdatesNotification: FC<OrdersUpdatesNotificationProps> = props => {
  const {classes: styles} = useOrdersUpdatesNotificationStyle()
  const {noticeItem} = props
  return (
    <div className={styles.body}>
      <Avatar
        src={SettingsModel.uiTheme === UiTheme.light ? '/assets/icons/snack-light.svg' : '/assets/icons/snack-dark.svg'}
        className={styles.avatarWrapper}
      />

      <div className={styles.centerWrapper}>
        {noticeItem?.vacOrders && (
          <OrdersUpdatesNotificationRow
            orders={noticeItem.vacOrders}
            title={t(TranslationKey['New orders available']) + ':'}
          />
        )}
        {noticeItem?.needConfirmOrders && (
          <OrdersUpdatesNotificationRow
            orders={noticeItem.needConfirmOrders}
            title={t(TranslationKey['Orders need confirmation']) + ':'}
            idHref={'/buyer/confirmation-required-orders'}
          />
        )}
      </div>

      <div className={styles.footer}>
        <Typography className={styles.messageDate}>{format(new Date(), 'HH:mm')}</Typography>
      </div>
    </div>
  )
}
