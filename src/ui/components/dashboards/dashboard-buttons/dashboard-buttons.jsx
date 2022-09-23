/* eslint-disable no-unused-vars */
import React from 'react'

import {Typography} from '@material-ui/core'
import {useHistory} from 'react-router-dom'

import {Message, MyNotificationsIcon, SettingsIcon} from '@constants/navbar-svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap, UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {useClassNames} from '@components/dashboards/dashboard-buttons/dashboard-buttons.style'

import {checkIsAdmin, checkIsStorekeeper, checkIsSupervisor} from '@utils/checks'
import {t} from '@utils/translations'

export const DashboardButtons = ({user, routes}) => {
  const classNames = useClassNames()
  const history = useHistory()

  return (
    <div className={classNames.buttonsWrapper}>
      <div
        className={classNames.buttonWrapper}
        onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.notifications}`)}
      >
        <div className={classNames.iconWrapper}>
          <MyNotificationsIcon classes={{root: classNames.fontSizeLarge}} />
        </div>

        <Typography className={classNames.title}>{t(TranslationKey.Notifications)}</Typography>
      </div>
      <div
        className={classNames.buttonWrapper}
        onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.messages}`)}
      >
        <div className={classNames.iconWrapper}>
          <Message classes={{root: classNames.fontSizeLarge}} />
        </div>

        <Typography className={classNames.title}>{t(TranslationKey.Messages)}</Typography>
      </div>
      {checkIsAdmin(UserRoleCodeMap[user.role]) ||
      checkIsStorekeeper(UserRoleCodeMap[user.role]) ||
      checkIsSupervisor(UserRoleCodeMap[user.role]) ? (
        <div
          className={classNames.buttonWrapper}
          onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.settings}`)}
        >
          <div className={classNames.iconWrapper}>
            <SettingsIcon classes={{root: classNames.fontSizeLarge}} />
          </div>

          <Typography className={classNames.title}>
            {checkIsStorekeeper(UserRoleCodeMap[user.role])
              ? t(TranslationKey['Warehouse management'])
              : t(TranslationKey.Settings)}
          </Typography>
        </div>
      ) : null}
    </div>
  )
}
