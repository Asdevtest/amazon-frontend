/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { colorByIdeaStatus, ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { Notification, NotificationIdeaStatus } from '@typings/enums/notification'

import { useStyles } from './idea-notification-message-cell.style'

interface IdeaNotificationMessageCellProps {
  notification: any
  navigateToHandler: (notification: any, type: string) => void
}

export const IdeaNotificationMessageCell: FC<IdeaNotificationMessageCellProps> = memo(
  ({ navigateToHandler, notification }) => {
    const { classes: styles } = useStyles()

    const getIdeaMessageTextToRender = () => {
      switch (notification.type) {
        case NotificationIdeaStatus.Create:
          return t(TranslationKey['created the idea'])

        case NotificationIdeaStatus.StatusChange:
          return t(TranslationKey['changed the status of the idea'])

        case NotificationIdeaStatus.Patch:
          return t(TranslationKey['updated the data on the idea of'])
      }
    }

    return (
      <p>
        <a className={styles.notificationId} onClick={() => navigateToHandler(notification, 'user')}>
          {notification?.sub?.name || notification?.creator?.name}
        </a>
        {` ${getIdeaMessageTextToRender()} `}
        <a className={styles.notificationId} onClick={() => navigateToHandler(notification, Notification.Idea)}>
          {notification?.productName}
        </a>
        {notification.type === NotificationIdeaStatus.StatusChange && (
          <>
            {` ${t(TranslationKey.to)} `}
            <span style={{ color: colorByIdeaStatus(ideaStatusByCode[notification.status]) }}>
              {ideaStatusTranslate(ideaStatusByCode[notification.status])}
            </span>
          </>
        )}
      </p>
    )
  },
)
