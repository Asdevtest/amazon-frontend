import { Header as AntHeader } from 'antd/es/layout/layout'
import { observer } from 'mobx-react'
import { FC, useContext, useEffect, useRef } from 'react'
import { IoMdSunny } from 'react-icons/io'
import { MdBrightness3 } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { SimpleMessagesNotification } from '@components/layout/notifications/simple-messages-notification'
import { CustomTimer } from '@components/shared/custom-timer'
import { LanguageSelector } from '@components/shared/language-selector'
import { HintsOffIcon, HintsOnIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { HintsContext } from '@contexts/hints-context'

import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './header.style'

import { NotificationSelect, ProfileDropdown, RoleSelect } from './components'
import { HeaderModel } from './header.model'

interface HeaderProps {
  title: string
}

export const Header: FC<HeaderProps> = observer(({ title }) => {
  const { hints, setHints } = useContext(HintsContext)
  const history = useHistory()
  const { classes: styles, cx } = useStyles()
  const componentModel = useRef(new HeaderModel({ history }))

  const {
    snackNotifications,
    simpleMessageCrmItemId,
    showHints,
    toggleServerSettings,
    clearSnackNoticeByKey: markNotificationAsReaded,
    onClickMessage,
    checkMessageIsRead,
    changeUiTheme,
  } = componentModel.current

  useEffect(() => {
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
        { className: styles.toastContainer },
      )
      markNotificationAsReaded(snackNoticeKey.SIMPLE_MESSAGE)
    }
  }, [snackNotifications])

  const onClickThemeIcon = (theme: string) => {
    changeUiTheme(theme)
  }

  return (
    <AntHeader className={styles.header}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{t(TranslationKey[`${title as TranslationKey}`])}</p>

        <div className={styles.tooltipWrapper} onClick={() => setHints(!hints)}>
          {showHints ? (
            <HintsOnIcon
              className={cx(styles.hintsIcon, styles.hintsIconActive)}
              fontSize={'small'}
              viewBox={'0 0 18 18'}
            />
          ) : (
            <HintsOffIcon className={styles.hintsIcon} fontSize={'small'} viewBox={'0 0 18 18'} />
          )}
          {showHints ? (
            <p className={styles.hintsTextActive}>{t(TranslationKey['Hints included'])}</p>
          ) : (
            <p className={styles.hintsTextNoActive}>{t(TranslationKey['Hints are off'])}</p>
          )}
        </div>
      </div>

      <CustomTimer
        targetDate={toggleServerSettings?.approximateShutdownTime || new Date()}
        tooltipText="Time until server shutdown"
      />
      <RoleSelect />
      <NotificationSelect />

      <LanguageSelector className={styles.languageSelector} />

      {SettingsModel.uiTheme === UiTheme.light ? (
        <IoMdSunny size={24} className={styles.themeIcon} onClick={() => onClickThemeIcon(UiTheme.dark)} />
      ) : (
        <MdBrightness3 size={24} className={styles.themeIcon} onClick={() => onClickThemeIcon(UiTheme.light)} />
      )}

      <ProfileDropdown />
    </AntHeader>
  )
})
