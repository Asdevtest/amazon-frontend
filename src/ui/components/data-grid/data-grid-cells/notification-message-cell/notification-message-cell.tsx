/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BoxNotificationMessageCell,
  IdeaNotificationMessageCell,
  ListingNotificationMessageCell,
  OrderNotificationMessageCell,
  RequestNotificationMessageCell,
  ShopNotificationMessageCell,
} from '..'
import { FC, memo } from 'react'

import { Notification } from '@typings/enums/notification'

interface NotificationMessageCellProps {
  notificationType: Notification
  notification: any
  navigateToHandler: any
}

export const NotificationMessageCell: FC<NotificationMessageCellProps> = memo(
  ({ notificationType, notification, navigateToHandler }) => (
    <>
      {notificationType === Notification.Order ? (
        <OrderNotificationMessageCell navigateToHandler={navigateToHandler} notification={notification} />
      ) : null}

      {notificationType === Notification.Box ? <BoxNotificationMessageCell notification={notification} /> : null}

      {notificationType === Notification.Idea ? (
        <IdeaNotificationMessageCell navigateToHandler={navigateToHandler} notification={notification} />
      ) : null}

      {[Notification.Request, Notification.Proposal].includes(notificationType) ? (
        <RequestNotificationMessageCell notification={notification} />
      ) : null}

      {notificationType === Notification.Shop ? <ShopNotificationMessageCell notification={notification} /> : null}

      {notificationType === Notification.Launch ? <ListingNotificationMessageCell notification={notification} /> : null}
    </>
  ),
)
