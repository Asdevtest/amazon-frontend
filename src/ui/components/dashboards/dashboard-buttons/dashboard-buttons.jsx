import { useHistory } from 'react-router-dom'

import { Typography } from '@mui/material'

import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'

import { useStyles } from '@components/dashboards/dashboard-buttons/dashboard-buttons.style'
import { Message, MyNotificationsIcon, SettingsIcon } from '@components/shared/svg-icons'

import { checkIsAdmin, checkIsResearcher, checkIsStorekeeper, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

export const DashboardButtons = ({ user, routes }) => {
  const { classes: styles } = useStyles()
  const history = useHistory()

  const unreadMessages = ChatModel.unreadMessages

  const notices =
    (user.needConfirmPriceChange?.boxes || 0) +
    (user.needConfirmPriceChange?.orders || 0) +
    (user.needUpdateTariff?.boxes || 0) +
    (user.freelanceNotices?.length || 0) +
    (user.notificationCounter || 0)

  return (
    <div className={styles.buttonsWrapper}>
      {!checkIsResearcher(UserRoleCodeMap[user.role]) && (
        <div
          className={styles.buttonWrapper}
          onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.notifications}`)}
        >
          <div className={styles.iconWrapper}>
            <MyNotificationsIcon classes={{ root: styles.fontSizeLarge }} fontSize="large" />
            {Number(notices) > 0 ? <div className={styles.badge}>{notices}</div> : undefined}
          </div>

          <Typography className={styles.title}>{t(TranslationKey.Notifications)}</Typography>
        </div>
      )}
      <div
        className={styles.buttonWrapper}
        onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.messages}`)}
      >
        <div className={styles.iconWrapper}>
          <Message classes={{ root: styles.fontSizeLarge }} fontSize="large" />

          {unreadMessages ? <div className={styles.badge}>{unreadMessages}</div> : undefined}
        </div>

        <Typography className={styles.title}>{t(TranslationKey.Messages)}</Typography>
      </div>
      {checkIsAdmin(UserRoleCodeMap[user.role]) ||
      checkIsStorekeeper(UserRoleCodeMap[user.role]) ||
      checkIsSupervisor(UserRoleCodeMap[user.role]) ? (
        <div
          className={styles.buttonWrapper}
          onClick={() => history.push(`/${UserRoleCodeMapForRoutes[user.role]}/${routes.settings}`)}
        >
          <div className={styles.iconWrapper}>
            <SettingsIcon classes={{ root: styles.fontSizeLarge }} fontSize="large" />
          </div>

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
