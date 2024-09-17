import { useHistory } from 'react-router-dom'

import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'

import { useStyles } from '@components/dashboards/dashboard-buttons/dashboard-buttons.style'
import { MessageIcon, MyNotificationsIcon, SettingsIcon } from '@components/shared/svg-icons'

import { checkIsAdmin, checkIsStorekeeper, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

import { Roles } from '@typings/enums/roles'

const routes = {
  notifications: 'notifications/general-notifications-view',
  messages: 'messages',
  settings: 'settings',
  management: 'management',
}

export const DashboardButtons = ({ user }) => {
  const { classes: styles } = useStyles()
  const history = useHistory()

  const unreadMessages = ChatModel.unreadMessages

  const notices =
    (user.needConfirmPriceChange?.boxes || 0) +
    (user.needConfirmPriceChange?.orders || 0) +
    (user.needUpdateTariff?.boxes || 0) +
    (user.freelanceNotices?.length || 0) +
    (user.notificationCounter || 0)
  const excludedRoles = [Roles.RESEARCHER, Roles.STOREKEEPER, Roles.ADMIN, Roles.SUPERVISOR]
  const isNotificationsShown = !excludedRoles.includes(user.role)
  const buttonTitle = checkIsStorekeeper(UserRoleCodeMap[user.role])
    ? t(TranslationKey['Warehouse management'])
    : t(TranslationKey.Settings)
  const handleClickButton = () =>
    history.push(
      `/${UserRoleCodeMapForRoutes[user.role]}/${
        checkIsStorekeeper(UserRoleCodeMap[user.role]) ? routes.management : routes.settings
      }`,
    )

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

          <p className={styles.title}>{t(TranslationKey.Notifications)}</p>
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

        <p className={styles.title}>{t(TranslationKey.Messages)}</p>
      </div>
      {checkIsAdmin(UserRoleCodeMap[user.role]) ||
      checkIsStorekeeper(UserRoleCodeMap[user.role]) ||
      checkIsSupervisor(UserRoleCodeMap[user.role]) ? (
        <div className={styles.buttonWrapper}>
          <button className={styles.iconWrapper} onClick={handleClickButton}>
            <SettingsIcon classes={{ root: styles.fontSizeLarge }} fontSize="large" />
          </button>

          <p className={styles.title}>{buttonTitle}</p>
        </div>
      ) : null}
    </div>
  )
}
