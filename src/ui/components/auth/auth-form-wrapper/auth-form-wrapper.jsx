import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useFaviconNotification } from 'react-favicon-notification'

import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { Divider, Typography } from '@mui/material'

import { appVersion } from '@constants/app-version'
import { UiTheme } from '@constants/theme/mui-theme.type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal/confirmation-modal.jsx'
import { LanguageSelector } from '@components/shared/selectors/language-selector/language-selector.jsx'

import { t } from '@utils/translations'

import { useStyles } from './auth-form-wrapper.style.js'

export const AuthFormWrapper = observer(
  ({
    redirect,
    title,
    showConfirmModal = false,
    confirmModalSettings,
    children,
    onClickThemeIcon,
    onClickRedirect,
    onToggleModal,
    onClickVersion,
  }) => {
    const { classes: styles } = useStyles()

    const [config, setConfig] = useFaviconNotification()

    useEffect(() => {
      setConfig({ ...config, show: false })
    }, []) // при разлогине скидывает счетчик уведомлений в иконке во вкладке браузера

    return (
      <>
        <div className={styles.rightPanel}>
          <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <Typography className={styles.title}>{title}</Typography>
              <div className={styles.redirectWrapper}>
                <Typography className={styles.redirect} onClick={onClickRedirect}>
                  {redirect}
                </Typography>

                <div className={styles.selectorsWrapper}>
                  {SettingsModel.uiTheme === UiTheme.light ? (
                    <WbSunnyRoundedIcon className={styles.themeIcon} onClick={() => onClickThemeIcon(UiTheme.dark)} />
                  ) : (
                    <Brightness3RoundedIcon
                      className={styles.themeIcon}
                      onClick={() => onClickThemeIcon(UiTheme.light)}
                    />
                  )}

                  <LanguageSelector />
                </div>
              </div>
            </div>
            <Divider className={styles.divider} />
            {children}
          </div>

          <Typography className={styles.version} onClick={onClickVersion}>
            {appVersion}
          </Typography>
        </div>

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={onToggleModal}
          isWarning={confirmModalSettings?.isWarning}
          title={confirmModalSettings?.confirmTitle}
          message={confirmModalSettings?.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={confirmModalSettings?.onClickConfirm}
          onClickCancelBtn={onToggleModal}
        />
      </>
    )
  },
)
