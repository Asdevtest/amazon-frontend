import { FC, memo, useState } from 'react'
import { IoIosNotificationsOff, IoIosNotificationsOutline } from 'react-icons/io'

import { CustomButton } from '@components/shared/custom-button'

import classes from './NotificationSelect.module.scss'

export const NotificationSelect: FC = memo(() => {
  const [enabledNotifications, setEnabledNotifications] = useState(true)

  const onToggleNotifications = () => {
    setEnabledNotifications(prev => {
      localStorage.setItem('enabledNotifications', String(!prev)) // TODO: вынести в функцию запись/удаление/добавление localStorage
      return !prev
    })
  }

  return (
    <CustomButton type="link" className={classes.root} onClick={onToggleNotifications}>
      {enabledNotifications ? (
        <IoIosNotificationsOutline className={classes.icon} />
      ) : (
        <IoIosNotificationsOff className={classes.icon} />
      )}
    </CustomButton>
  )
})
