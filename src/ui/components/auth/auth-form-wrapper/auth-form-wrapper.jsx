import { useEffect } from 'react'
import { useFaviconNotification } from 'react-favicon-notification'

import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { Divider, Typography } from '@mui/material'

import { appVersion } from '@constants/app-version.js'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal/confirmation-modal.jsx'
import { LanguageSelector } from '@components/shared/selectors/language-selector/language-selector.jsx'

import { t } from '@utils/translations'

import { useClassNames } from './auth-form-wrapper.style.js'

export const AuthFormWrapper = ({
  redirect,
  title,
  showConfirmModal,
  confirmModalSettings,
  children,
  onClickThemeIcon,
  onClickRedirect,
  onToggleModal,
  onClickVersion,
}) => {
  const { classes: classNames } = useClassNames()

  const [config, setConfig] = useFaviconNotification()

  useEffect(() => {
    setConfig({ ...config, show: false })
  }, []) // при разлогине скидывает счетчик уведомлений в иконке во вкладке браузера

  return (
    <>
      <div className={classNames.rightPanel}>
        <div className={classNames.formWrapper}>
          <div className={classNames.formHeader}>
            <Typography className={classNames.title}>{title}</Typography>
            <div className={classNames.redirectWrapper}>
              <Typography className={classNames.redirect} onClick={onClickRedirect}>
                {redirect}
              </Typography>

              <div className={classNames.selectorsWrapper}>
                {SettingsModel.uiTheme === UiTheme.light ? (
                  <WbSunnyRoundedIcon className={classNames.themeIcon} onClick={() => onClickThemeIcon(UiTheme.dark)} />
                ) : (
                  <Brightness3RoundedIcon
                    className={classNames.themeIcon}
                    onClick={() => onClickThemeIcon(UiTheme.light)}
                  />
                )}

                <LanguageSelector />
              </div>
            </div>
          </div>
          <Divider className={classNames.divider} />
          {children}
        </div>

        <Typography className={classNames.version} onClick={onClickVersion}>
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
}
