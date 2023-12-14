/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './box-notification-message-cell.style'

interface BoxNotificationMessageCellProps {
  notification: any
}

export const BoxNotificationMessageCell: FC<BoxNotificationMessageCellProps> = React.memo(({ notification }) => {
  const { classes: styles } = useStyles()
  const history = useHistory()

  const goToBox = (boxId: string) => {
    history.push(`/client/warehouse/in-stock?search-text=${boxId}`)
  }

  return (
    <p>
      {`${t(TranslationKey.Box)} № `}
      <a className={styles.notificationId} onClick={() => goToBox(notification?.humanFriendlyId)}>
        {notification?.humanFriendlyId}
      </a>{' '}
      {t(TranslationKey['accepted in stock'])}
    </p>
  )
})
