import { Header as AntHeader } from 'antd/es/layout/layout'
import { observer } from 'mobx-react'
import { FC, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { TranslationKey } from '@constants/translations/translation-key'

import { SimpleMessagesNotification } from '@components/layout/notifications/simple-messages-notification'
import { CustomTimer } from '@components/shared/custom-timer'

import { t } from '@utils/translations'

import { useStyles } from './header.style'

import { HintsSelect, LanguageSelect, NotificationSelect, ProfileMenu, RoleSelect, ThemeSelect } from './components'
import { HeaderModel } from './header.model'

interface HeaderProps {
  title: string
}

export const Header: FC<HeaderProps> = observer(({ title }) => {
  const history = useHistory()
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new HeaderModel(history), [])

  // removed with all HeaderModel
  useEffect(() => {
    if (
      viewModel.snackNotifications[snackNoticeKey.SIMPLE_MESSAGE] &&
      !history.location.pathname.includes('/messages') &&
      !viewModel.checkMessageIsRead(viewModel.snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]) &&
      !history.location.search.includes(viewModel.simpleMessageCrmItemId)
    ) {
      toast(
        <SimpleMessagesNotification
          noticeItem={viewModel.snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]}
          onClickMessage={viewModel.onClickMessage}
        />,
        { className: styles.toastContainer },
      )
      viewModel.clearSnackNoticeByKey(snackNoticeKey.SIMPLE_MESSAGE)
    }
  }, [viewModel.snackNotifications])

  return (
    <AntHeader className={styles.header}>
      <div className={styles.flexContainer}>
        <p className={styles.title}>{t(TranslationKey[`${title as TranslationKey}`])}</p>
        <HintsSelect />
      </div>
      <CustomTimer
        targetDate={viewModel.toggleServerSettings?.approximateShutdownTime}
        tooltipText="Time until server shutdown"
      />
      <RoleSelect />
      <LanguageSelect />
      <NotificationSelect />
      <ThemeSelect />
      <ProfileMenu />
    </AntHeader>
  )
})
