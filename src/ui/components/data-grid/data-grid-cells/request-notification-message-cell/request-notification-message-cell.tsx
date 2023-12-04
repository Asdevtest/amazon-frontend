/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { UserRole, UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatusColor, RequestProposalStatusTranslate } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { formatNormDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './request-notification-message-cell.style'

interface RequestNotificationMessageCellProps {
  notification: any
}

export const RequestNotificationMessageCell: FC<RequestNotificationMessageCellProps> = React.memo(
  ({ notification }) => {
    const { classes: styles } = useStyles()

    const isStatusChanged = !!notification?.status
    const isDeadlineExpires = !!notification?.timeoutAt
    // @ts-ignore
    const userRole = UserModel?.userInfo?.role

    const getUrlToRequest = (id: string) => {
      if (UserRoleCodeMap[userRole] === UserRole.FREELANCER) {
        return `/${UserRoleCodeMapForRoutes[userRole]}/freelance/my-proposals/custom-search-request?request-id=${id}`
      } else {
        return `/${UserRoleCodeMapForRoutes[userRole]}/freelance/my-requests/custom-request?request-id=${id}`
      }
    }

    return (
      <p>
        {isStatusChanged && !isDeadlineExpires && (
          <>
            {t(TranslationKey['Status of the proposal by request '])}{' '}
            <NavLink to={getUrlToRequest(notification?.request?._id)} className={styles.notificationId} target="_blank">
              {`"${notification?.request?.humanFriendlyId}" `}
            </NavLink>
            {t(TranslationKey['changed to'])}
            <span style={{ color: RequestProposalStatusColor(notification?.status) }}>
              {' '}
              {RequestProposalStatusTranslate(notification?.status)}
            </span>
          </>
        )}

        {isDeadlineExpires && (
          <>
            {t(TranslationKey['Deadline for request'])}{' '}
            <NavLink
              to={getUrlToRequest(notification?.request?._id || notification?._id)}
              className={styles.notificationId}
              target="_blank"
            >
              {`"${notification?.humanFriendlyId || notification?.request?.humanFriendlyId}" `}
            </NavLink>
            {t(TranslationKey.expires)} {formatNormDateTime(notification?.timeoutAt)}
          </>
        )}
      </p>
    )
  },
)
