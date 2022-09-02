/* eslint-disable no-unused-vars */
import React from 'react'

import {Typography} from '@material-ui/core'

import {Message, MyNotificationsIcon, SettingsIcon} from '@constants/navbar-svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {useClassNames} from '@components/dashboards/dashboard-buttons/dashboard-buttons.style'

import {t} from '@utils/translations'

export const DashboardButtons = () => {
  const classNames = useClassNames()
  return (
    <div className={classNames.buttonsWrapper}>
      <div className={classNames.buttonWrapper}>
        <div className={classNames.iconWrapper}>
          <MyNotificationsIcon classes={{root: classNames.fontSizeLarge}} />
        </div>

        <Typography className={classNames.title}>{t(TranslationKey.Notifications)}</Typography>
      </div>
      <div className={classNames.buttonWrapper}>
        <div className={classNames.iconWrapper}>
          <Message classes={{root: classNames.fontSizeLarge}} />
        </div>

        <Typography className={classNames.title}>{t(TranslationKey.Messages)}</Typography>
      </div>
      <div className={classNames.buttonWrapper}>
        <div className={classNames.iconWrapper}>
          <SettingsIcon classes={{root: classNames.fontSizeLarge}} />
        </div>

        <Typography className={classNames.title}>{t(TranslationKey.Settings)}</Typography>
      </div>
    </div>
  )
}
