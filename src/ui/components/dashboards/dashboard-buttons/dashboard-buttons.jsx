/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material'

import React from 'react'

import {useHistory} from 'react-router-dom'

import {Message, MyNotificationsIcon, SettingsIcon} from '@constants/svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap, UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {ChatModel} from '@models/chat-model'

import {useClassNames} from '@components/dashboards/dashboard-buttons/dashboard-buttons.style'

import {checkIsAdmin, checkIsResearcher, checkIsStorekeeper, checkIsSupervisor} from '@utils/checks'
import {t} from '@utils/translations'

export const DashboardButtons = ({user, routes}) => {
  const {classes: classNames} = useClassNames()
  const history = useHistory()

  const unreadMessages = ChatModel.unreadMessages

  const notices =
    (user.needConfirmPriceChange?.boxes || 0) +
    (user.needConfirmPriceChange?.orders || 0) +
    (user.needUpdateTariff?.boxes || 0)

  return (
    <div className={classNames.buttonsWrapper}>
      {!checkIsResearcher(UserRoleCodeMap[user.role]) && (
        <div
          className={classNames.buttonWrapper}
          onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.notifications}`)}
        >
          <div className={classNames.iconWrapper}>
            <MyNotificationsIcon classes={{root: classNames.fontSizeLarge}} fontSize="large" />
            {Number(notices) > 0 ? <div className={classNames.badge}>{notices}</div> : undefined}
          </div>

          <Typography className={classNames.title}>{t(TranslationKey.Notifications)}</Typography>
        </div>
      )}
      <div
        className={classNames.buttonWrapper}
        onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.messages}`)}
      >
        <div className={classNames.iconWrapper}>
          <Message classes={{root: classNames.fontSizeLarge}} fontSize="large" />

          {unreadMessages ? <div className={classNames.badge}>{unreadMessages}</div> : undefined}
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
            <SettingsIcon classes={{root: classNames.fontSizeLarge}} fontSize="large" />
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
