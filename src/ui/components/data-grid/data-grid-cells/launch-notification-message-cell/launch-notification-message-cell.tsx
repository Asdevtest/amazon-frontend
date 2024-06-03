import { FC, memo, useMemo } from 'react'

import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'
import { getLaunchStyle } from '@components/shared/launches/helpers/get-launch-style'

import { useStyles } from './launch-notification-message-cell.style'

import { getNotificationTitle } from './helpers/get-notification-title'
import { LaunchNotificationType } from './launch-notification-message.type'

interface LaunchNotificationMessageCellProps {
  notification: any
}

export const ListingNotificationMessageCell: FC<LaunchNotificationMessageCellProps> = memo(({ notification }) => {
  const { classes: styles, theme } = useStyles()

  console.log('notification :>> ', notification)

  const title = useMemo(() => {
    return getNotificationTitle(notification.type)
  }, [notification.type])

  return (
    <div className={styles.wrapper}>
      <p>{title}</p>

      {notification.launches.map((launch, index: number) => (
        <div key={index}>
          <p style={getLaunchStyle(launch.type, theme)} className={styles.text}>
            {`${getLaunchName(launch.type, true)} ${launch.value} %`}
          </p>

          {notification.type === LaunchNotificationType.ALMOST_RUNNING_OUT ? (
            <p className={styles.text}>{`${notification.startDate} - ${notification.endDate}`}</p>
          ) : null}
        </div>
      ))}
    </div>
  )
})
