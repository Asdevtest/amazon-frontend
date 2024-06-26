import { memo } from 'react'

import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { Divider } from '@mui/material'

import { appVersion } from '@constants/app-version'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal/confirmation-modal.jsx'
import { LanguageSelector } from '@components/shared/language-selector/language-selector'

import { t } from '@utils/translations'

import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './auth-form-wrapper.style'

export const AuthFormWrapper = memo(props => {
  const {
    redirect,
    title,
    showConfirmModal = false,
    confirmModalSettings,
    children,
    onClickThemeIcon,
    onClickRedirect,
    onToggleModal,
    onClickVersion,
  } = props
  const { classes: styles } = useStyles()

  return (
    <>
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <p className={styles.title}>{title}</p>

            <div className={styles.redirectWrapper}>
              <p className={styles.redirect} onClick={onClickRedirect}>
                {redirect}
              </p>

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

        <p className={styles.version} onClick={onClickVersion}>
          {appVersion}
        </p>
      </div>

      {/* {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null} */}
    </>
  )
})
