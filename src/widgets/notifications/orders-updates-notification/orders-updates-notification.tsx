import { format } from 'date-fns'
import { History } from 'history'
import { FC } from 'react'

import { Avatar, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { t } from '@utils/translations'

import { UiTheme } from '@typings/enums/ui-theme'

import { useOrdersUpdatesNotificationStyle } from './orders-updates-notification.style'

import { OrdersUpdatesNotificationRow } from './orders-updates-notification-row'
import { OrdersUpdatesNotificationItem } from './orders-updates-notification-types'

interface OrdersUpdatesNotificationProps {
  noticeItem: {
    needConfirmOrders: OrdersUpdatesNotificationItem[]
    vacOrders: OrdersUpdatesNotificationItem[]
  } | null
  history: History
}

export const OrdersUpdatesNotification: FC<OrdersUpdatesNotificationProps> = props => {
  const { classes: styles } = useOrdersUpdatesNotificationStyle()
  const { noticeItem, history } = props
  return (
    <div className={styles.body}>
      <Avatar
        src={SettingsModel.uiTheme === UiTheme.light ? '/assets/icons/snack-light.svg' : '/assets/icons/snack-dark.svg'}
        className={styles.avatarWrapper}
      />

      <div className={styles.centerWrapper}>
        <Typography className={styles.attentionTitle}>{t(TranslationKey.Notice).toUpperCase()}</Typography>

        {!!noticeItem?.vacOrders?.length && (
          <OrdersUpdatesNotificationRow
            history={history}
            orders={noticeItem.vacOrders}
            title={t(TranslationKey['New orders available']) + ':'}
          />
        )}
        {!!noticeItem?.needConfirmOrders?.length && (
          <OrdersUpdatesNotificationRow
            history={history}
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
