/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Tooltip } from '@mui/material'

import { Launches } from '@components/shared/launches'

import { formatDateWithoutYear } from '@utils/date-time'
import { timeToDeadlineInHoursAndMins } from '@utils/text'

import { ILaunch } from '@typings/shared/launch'

import { useStyles } from './launch-notification-message-cell.style'

import { getNotificationTitle } from './helpers/get-notification-title'
import { ILaunchNotification, LaunchNotificationType } from './launch-notification-message.type'

interface LaunchNotificationMessageCellProps {
  notification: ILaunchNotification
}

export const ListingNotificationMessageCell: FC<LaunchNotificationMessageCellProps> = memo(({ notification }) => {
  const { classes: styles } = useStyles()

  const title = useMemo(() => {
    return getNotificationTitle(notification.type)
  }, [notification.type])

  return (
    <div className={styles.wrapper}>
      <p>{`${title}:`}</p>

      {notification.launches.map((launch: ILaunch, index: number) => (
        <div key={index} className={styles.launchesWrapper}>
          <Link to={`/client/inventory/product?product-id=${notification.product?._id}&show-tab=reports`}>
            <Launches launches={[launch]} />
          </Link>

          {notification.type === LaunchNotificationType.ALMOST_RUNNING_OUT ? (
            <Tooltip title={timeToDeadlineInHoursAndMins({ date: launch.dateTo, withSeconds: true, now: new Date() })}>
              <p className={styles.text}>{formatDateWithoutYear(launch.dateTo)}</p>
            </Tooltip>
          ) : null}
        </div>
      ))}
    </div>
  )
})
