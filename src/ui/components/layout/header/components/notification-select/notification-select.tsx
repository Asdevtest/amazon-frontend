import { FC, memo, useState } from 'react'
import { IoIosNotificationsOff, IoIosNotificationsOutline } from 'react-icons/io'

import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './notification-select.style'

export const NotificationSelect: FC = memo(() => {
  const { classes: styles } = useStyles()
  const [enabledNotifications, setEnabledNotifications] = useState(true)

  const onToggleNotifications = () => {
    setEnabledNotifications(prev => {
      localStorage.setItem('enabledNotifications', String(!prev))
      return !prev
    })
  }

  return (
    <CustomButton type="link" className={styles.root} onClick={onToggleNotifications}>
      {enabledNotifications ? (
        <IoIosNotificationsOutline className={styles.icon} />
      ) : (
        <IoIosNotificationsOff className={styles.icon} />
      )}
    </CustomButton>
  )
})
