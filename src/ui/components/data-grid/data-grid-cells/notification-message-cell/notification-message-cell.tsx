/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { NotificationType } from '@constants/keys/notifications'

import {
  BoxNotificationMessageCell,
  IdeaNotificationMessageCell,
  OrderNotificationMessageCell,
  RequestNotificationMessageCell,
  ShopNotificationMessageCell,
} from '../data-grid-cells'

interface NotificationMessageCellProps {
  notificationType: NotificationType
  notification: any
  navigateToHandler: any
}

export const NotificationMessageCell: FC<NotificationMessageCellProps> = memo(
  ({ notificationType, notification, navigateToHandler }) => (
    <>
      {notificationType === NotificationType.Order && (
        <OrderNotificationMessageCell navigateToHandler={navigateToHandler} notification={notification} />
      )}

      {notificationType === NotificationType.Box && <BoxNotificationMessageCell notification={notification} />}

      {notificationType === NotificationType.Idea && (
        <IdeaNotificationMessageCell navigateToHandler={navigateToHandler} notification={notification} />
      )}

      {[NotificationType.Request, NotificationType.Proposal].includes(notificationType) && (
        <RequestNotificationMessageCell notification={notification} />
      )}

      {notificationType === NotificationType.Shop && <ShopNotificationMessageCell notification={notification} />}
    </>
  ),
)
