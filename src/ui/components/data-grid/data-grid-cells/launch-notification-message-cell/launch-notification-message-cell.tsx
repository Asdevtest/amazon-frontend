/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Tooltip } from '@mui/material'

import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'
import { getLaunchStyle } from '@components/shared/launches/helpers/get-launch-style'

import { formatDateWithoutYear, formatNormDateTime } from '@utils/date-time'

import { ILaunch } from '@typings/shared/launch'

import { useStyles } from './launch-notification-message-cell.style'

import { getNotificationTitle } from './helpers/get-notification-title'
import { LaunchNotificationType } from './launch-notification-message.type'

interface LaunchNotificationMessageCellProps {
  notification: any
}

export const ListingNotificationMessageCell: FC<LaunchNotificationMessageCellProps> = memo(({ notification }) => {
  const { classes: styles, theme } = useStyles()

  const title = useMemo(() => {
    return getNotificationTitle(notification.type)
  }, [notification.type])

  return (
    <div className={styles.wrapper}>
      <p>{`${title}:`}</p>

      {notification.launches.map((launch: ILaunch, index: number) => {
        const type = launch.type
        const dateTo = launch.dateTo

        return (
          <div key={index} className={styles.launchesWrapper}>
            <Link
              to={`/client/inventory/product?product-id=${notification.product?._id}&show-tab=reports`}
              style={getLaunchStyle(type, theme)}
              className={styles.text}
            >
              {`${getLaunchName(type, true)} ${launch.value} %`}
            </Link>

            {notification.type === LaunchNotificationType.ALMOST_RUNNING_OUT ? (
              <Tooltip title={formatNormDateTime(dateTo)}>
                <p className={styles.text}>{formatDateWithoutYear(dateTo)}</p>
              </Tooltip>
            ) : null}
          </div>
        )
      })}
    </div>
  )
})
