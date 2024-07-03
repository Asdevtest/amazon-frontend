import { memo } from 'react'

import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'

import { appVersion } from '@constants/app-version'

import { SettingsModel } from '@models/settings-model'

import { CustomButton } from '@components/shared/custom-button'
import { LanguageSelector } from '@components/shared/language-selector/language-selector'

import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './auth-form-wrapper.style'

export const AuthFormWrapper = memo(props => {
  const { redirect, title, children, onClickThemeIcon, onClickVersion, onClickRedirect } = props
  const { classes: styles } = useStyles()

  return (
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
                <Brightness3RoundedIcon className={styles.themeIcon} onClick={() => onClickThemeIcon(UiTheme.light)} />
              )}

              <LanguageSelector />
            </div>
          </div>
        </div>

        {children}
      </div>

      <CustomButton type="link" className={styles.version} onClick={onClickVersion}>
        {appVersion}
      </CustomButton>
    </div>
  )
})
