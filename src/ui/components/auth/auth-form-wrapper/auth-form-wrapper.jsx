import { memo } from 'react'
import { Link } from 'react-router-dom'

import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { Divider } from '@mui/material'

import { appVersion } from '@constants/app-version'

import { SettingsModel } from '@models/settings-model'

import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './auth-form-wrapper.style'

export const AuthFormWrapper = memo(props => {
  const { redirect, title, children, onClickThemeIcon, onClickVersion } = props
  const { classes: styles } = useStyles()

  return (
    <>
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <p className={styles.title}>{title}</p>

            <div className={styles.redirectWrapper}>
              <Link to={'/registration'} className={styles.redirect}>
                {redirect}
              </Link>

              <div className={styles.selectorsWrapper}>
                {SettingsModel.uiTheme === UiTheme.light ? (
                  <WbSunnyRoundedIcon className={styles.themeIcon} onClick={() => onClickThemeIcon(UiTheme.dark)} />
                ) : (
                  <Brightness3RoundedIcon
                    className={styles.themeIcon}
                    onClick={() => onClickThemeIcon(UiTheme.light)}
                  />
                )}
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
