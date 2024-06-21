import { useHistory } from 'react-router-dom'

import { Typography } from '@mui/material'

import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'

import { useStyles } from '@components/dashboards/dashboard-buttons/dashboard-buttons.style'
import { MessageIcon, MyNotificationsIcon, SettingsIcon } from '@components/shared/svg-icons'

import { checkIsAdmin, checkIsResearcher, checkIsStorekeeper, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

export const DashboardButtons = ({ user }) => {
  const { classes: styles } = useStyles()
  const history = useHistory()

  const unreadMessages = ChatModel.unreadMessages

  const routes = {
    notifications: 'notifications/general-notifications-view',
    messages: 'messages',
  }

  const notices =
    (user.needConfirmPriceChange?.boxes || 0) +
    (user.needConfirmPriceChange?.orders || 0) +
    (user.needUpdateTariff?.boxes || 0) +
    (user.freelanceNotices?.length || 0) +
    (user.notificationCounter || 0)

  const isNotificationsShown =
    !checkIsResearcher(UserRoleCodeMap[user.role]) && !checkIsStorekeeper(UserRoleCodeMap[user.role])

  return (
    <div className={styles.buttonsWrapper}>
      {isNotificationsShown ? (
        <div className={styles.buttonWrapper}>
          <button
            className={styles.iconWrapper}
            onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.notifications}`)}
          >
            <MyNotificationsIcon classes={{ root: styles.fontSizeLarge }} fontSize="large" />
            {Number(notices) > 0 ? <div className={styles.badge}>{notices}</div> : null}
          </button>

          <Typography className={styles.title}>{t(TranslationKey.Notifications)}</Typography>
        </div>
      ) : null}
      <div className={styles.buttonWrapper}>
        <button
          className={styles.iconWrapper}
          onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.messages}`)}
        >
          <MessageIcon classes={{ root: styles.fontSizeLarge }} fontSize="large" />

          {Number(unreadMessages) > 0 ? <div className={styles.badge}>{unreadMessages}</div> : null}
        </button>

        <Typography className={styles.title}>{t(TranslationKey.Messages)}</Typography>
      </div>
      {checkIsAdmin(UserRoleCodeMap[user.role]) ||
      checkIsStorekeeper(UserRoleCodeMap[user.role]) ||
      checkIsSupervisor(UserRoleCodeMap[user.role]) ? (
        <div className={styles.buttonWrapper}>
          <button
            className={styles.iconWrapper}
            onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.settings}`)}
          >
            <SettingsIcon classes={{ root: styles.fontSizeLarge }} fontSize="large" />
          </button>

          <Typography className={styles.title}>
            {checkIsStorekeeper(UserRoleCodeMap[user.role])
              ? t(TranslationKey['Warehouse management'])
              : t(TranslationKey.Settings)}
          </Typography>
        </div>
      ) : null}
    </div>
  )
}
