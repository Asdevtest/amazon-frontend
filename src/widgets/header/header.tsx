import { Header as AntHeader } from 'antd/es/layout/layout'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { CustomTimer } from '@components/shared/custom-timer'

import { LanguageSelect } from '../language-select'
import { NotificationSelect } from '../notification-select'
import { ProfileDropdown } from '../profile-dropdown'
import { RoleSelect } from '../role-select'
import { ThemeSelect } from '../theme-select'

import { HeaderModel } from './header.model'
import classes from './header.module.scss'

interface Props {
  title: string
}

export const Header: FC<Props> = observer(({ title }) => {
  const [viewModel] = useState(() => new HeaderModel())

  /* useEffect(() => {
    if (
      snackNotifications[snackNoticeKey.SIMPLE_MESSAGE] &&
      !history.location.pathname.includes('/messages') &&
      !checkMessageIsRead(snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]) &&
      !history.location.search.includes(simpleMessageCrmItemId)
    ) {
      toast(
        <SimpleMessagesNotification
          noticeItem={snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]}
          onClickMessage={onClickMessage}
        />,
        { className: classes.toastContainer },
      )
      markNotificationAsReaded(snackNoticeKey.SIMPLE_MESSAGE)
    }
  }, [snackNotifications]) */

  return (
    <AntHeader className={classes.header}>
      {/* <div className={classes.menuIconWrapper}>
        <MenuIcon className={classes.menuIcon} />
      </div> */}

      {/* <div className={classes.titleWrapper}>
        <p key={SettingsModel.languageTag} className={classes.title}>
          {t(TranslationKey[`${title as TranslationKey}`])}
        </p>
      </div> */}

      <CustomTimer
        targetDate={viewModel.toggleServerSettings?.approximateShutdownTime}
        tooltipText="Time until server shutdown"
      />
      <RoleSelect />
      <LanguageSelect />
      <NotificationSelect />
      <ThemeSelect />
      <ProfileDropdown />
    </AntHeader>
  )
})
