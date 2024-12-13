/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

import { RequestProposalStatusColor, RequestProposalStatusTranslate } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { formatNormDateTime } from '@utils/date-time'
import { getUrlToRequest } from '@utils/get-url-to-request/get-url-to-request'
import { t } from '@utils/translations'

import { useStyles } from './request-notification-message-cell.style'

interface RequestNotificationMessageCellProps {
  notification: any
}

export const RequestNotificationMessageCell: FC<RequestNotificationMessageCellProps> = memo(({ notification }) => {
  const { classes: styles } = useStyles()

  const isStatusChanged = !!notification?.status
  const isDeadlineExpires = !!notification?.timeoutAt

  const request = notification?.request
  const requestId = request?._id
  const requestXid = request?.xid || request?.humanFriendlyId

  return (
    <p>
      {isStatusChanged && !isDeadlineExpires && (
        <>
          {t(TranslationKey['Status of the proposal by request '])}{' '}
          <NavLink to={getUrlToRequest(requestId)} className={styles.notificationId} target="_blank">
            {`"${requestXid}" `}
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
            to={getUrlToRequest(requestId || notification?._id)}
            className={styles.notificationId}
            target="_blank"
          >
            {`"${notification?.xid || notification?.humanFriendlyId || requestXid}" `}
          </NavLink>
          {t(TranslationKey.expires)} {formatNormDateTime(notification?.timeoutAt)}
        </>
      )}
    </p>
  )
})
