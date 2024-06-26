/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './box-notification-message-cell.style'

interface BoxNotificationMessageCellProps {
  notification: any
}

export const BoxNotificationMessageCell: FC<BoxNotificationMessageCellProps> = memo(({ notification }) => {
  const { classes: styles } = useStyles()
  const history = useNavigate()

  const humanFriendlyId = notification?.humanFriendlyId

  const goToBox = () => {
    history(`/client/warehouse/in-stock?box-id=${humanFriendlyId}`)
  }

  return (
    <p>
      {`${t(TranslationKey.Box)} № `}
      <a className={styles.notificationId} onClick={goToBox}>
        {humanFriendlyId}
      </a>{' '}
      {t(TranslationKey['accepted in stock'])}
    </p>
  )
})
