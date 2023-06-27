import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { Divider, Typography } from '@mui/material'

import React, { useEffect } from 'react'

import { useFaviconNotification } from 'react-favicon-notification'

import { appVersion } from '@constants/app-version.js'
import { UiTheme } from '@constants/theme/themes'

import { SettingsModel } from '@models/settings-model'

import { LanguageSelector } from '@components/shared/selectors/language-selector/language-selector.jsx'

import { useClassNames } from './auth-form-wrapper.style.js'

export const AuthFormWrapper = ({ onClickRedirect, redirect, title, children }) => {
  const { classes: classNames } = useClassNames()

  const [config, setConfig] = useFaviconNotification()

  const onClickThemeIcon = theme => {
    SettingsModel.setUiTheme(theme)
  }

  useEffect(() => {
    setConfig({ ...config, show: false })
  }, []) // при разлогине скидывает счетчик уведомлений в иконке во вкладке браузера

  return (
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

      <Typography className={classNames.version}>{appVersion}</Typography>
    </div>
  )
}
