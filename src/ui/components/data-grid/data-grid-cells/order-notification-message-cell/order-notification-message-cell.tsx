/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { formatNormDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { Notification } from '@typings/enums/notification'

import { useStyles } from './order-notification-message-cell.style'

interface OrderNotificationMessageCellProps {
  notification: any
  navigateToHandler: (notification: any, notificationType: Notification) => void
}

export const OrderNotificationMessageCell: FC<OrderNotificationMessageCellProps> = memo(
  ({ navigateToHandler, notification }) => {
    const { classes: styles } = useStyles()

    const onClickOrderId = () => {
      navigateToHandler(notification, Notification.Order)
    }

    const isVacOrders = !!notification?.vacOrders?.length
    const isNeedConfirmOrders = !!notification?.needConfirmOrders?.length

    return (
      <p>
        {isNeedConfirmOrders && (
          <>
            {`${t(TranslationKey.Order)} `}
            <a className={styles.notificationId} onClick={onClickOrderId}>
              {notification?.needConfirmOrders?.[0]?.id}
            </a>
            {` ${t(TranslationKey['needs to be confirmed'])}`}
          </>
        )}

        {isVacOrders && (
          <>
            {`${t(TranslationKey['New order available'])} `}
            <a className={styles.notificationId} onClick={onClickOrderId}>
              {notification?.vacOrders?.[0]?.id}
            </a>
          </>
        )}

        {!isVacOrders && !isNeedConfirmOrders && (
          <>
            {`${t(TranslationKey['Order redemption deadline'])} `}
            <a className={styles.notificationId} onClick={onClickOrderId}>
              {notification?.id}
            </a>
            {` ${t(TranslationKey.expires)} ${formatNormDateTime(notification?.deadline)}`}
          </>
        )}
      </p>
    )
  },
)
