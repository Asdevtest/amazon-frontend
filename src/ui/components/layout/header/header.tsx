import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { observer } from 'mobx-react'
import { FC, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import PersonIcon from '@mui/icons-material/Person'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { Avatar, Divider, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { UserRole, UserRoleCodeMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { BoxesUpdatesNotification } from '@components/layout/notifications/boxes-updates-notification'
import { IdeaNotification } from '@components/layout/notifications/idea-notification'
import { OrderDeadlineNotification } from '@components/layout/notifications/order-deadline-notification'
import { OrdersUpdatesNotification } from '@components/layout/notifications/orders-updates-notification/orders-updates-notification'
import { SimpleMessagesNotification } from '@components/layout/notifications/simple-messages-notification'
import { Button } from '@components/shared/buttons/button'
import { DialogModal } from '@components/shared/dialog-modal'
import { LanguageSelector } from '@components/shared/selectors/language-selector'
import { ExitIcon, HintsOff, HintsOn, MenuIcon } from '@components/shared/svg-icons'

import { checkIsResearcher } from '@utils/checks'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { getShortenStringIfLongerThanCount, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './header.styles'

import { HeaderModel } from './header.model'

interface Props {
  shortNavbar: boolean
  title: string
  onToggleModal: VoidFunction
  onMouseOver: VoidFunction
  onMouseOut: VoidFunction
}

export const Header: FC<Props> = observer(({ title, onToggleModal, onMouseOver, onMouseOut }) => {
  const history = useHistory()
  const location = useLocation()
  const { classes: classNames } = useClassNames()
  const componentModel = useRef(new HeaderModel({ history }))
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(true)

  const {
    role,
    userName,
    balance,
    userId,
    snackNotifications,
    simpleMessageCrmItemId,
    allowedRoles,
    showHints,
    clearSnackNoticeByKey: markNotificationAsReaded,
    onClickMessage,
    checkMessageIsRead,
    onExitFromRole,
    changeUserInfo,
    changeUiTheme,
    onTriggerShowHints,
  } = componentModel.current

  useEffect(() => {
    if (
      snackNotifications[snackNoticeKey.SIMPLE_MESSAGE] &&
      !location.pathname.includes('/messages') &&
      !checkMessageIsRead(snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]) &&
      !location.search.includes(simpleMessageCrmItemId)
    ) {
      toast(
        <SimpleMessagesNotification
          noticeItem={snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]}
          onClickMessage={onClickMessage}
        />,
        { autoClose: 5000 },
      )
      markNotificationAsReaded(snackNoticeKey.SIMPLE_MESSAGE)
    }

    if (isEnabledNotifications) {
      if (snackNotifications[snackNoticeKey.ORDER_DEADLINE]) {
        toast(<OrderDeadlineNotification noticeItem={snackNotifications[snackNoticeKey.ORDER_DEADLINE]} />, {
          autoClose: 5000,
        })
        markNotificationAsReaded(snackNoticeKey.ORDER_DEADLINE)
      }

      if (snackNotifications[snackNoticeKey.IDEAS]) {
        toast(<IdeaNotification role={role} noticeItem={snackNotifications[snackNoticeKey.IDEAS]} />, {
          autoClose: 5000,
        })
        markNotificationAsReaded(snackNoticeKey.IDEAS)
      }

      if (snackNotifications[snackNoticeKey.ORDERS_UPDATES]) {
        toast(
          <OrdersUpdatesNotification
            noticeItem={snackNotifications[snackNoticeKey.ORDERS_UPDATES]}
            history={history}
          />,
          {
            autoClose: 5000,
          },
        )
        markNotificationAsReaded(snackNoticeKey.ORDERS_UPDATES)
      }

      if (snackNotifications[snackNoticeKey.BOXES_UPDATES]) {
        toast(
          <BoxesUpdatesNotification noticeItem={snackNotifications[snackNoticeKey.BOXES_UPDATES]} history={history} />,
          {
            autoClose: 5000,
          },
        )
        markNotificationAsReaded(snackNoticeKey.BOXES_UPDATES)
      }
    }
  }, [snackNotifications])

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleClick = (event: { currentTarget: HTMLDivElement }) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickExit = () => {
    handleClose()
    toast.dismiss()
    onExitFromRole()
    history.push('/auth')
  }

  const onChangeUserInfo = (roleNun: number) => {
    changeUserInfo({ role: roleNun })
  }

  const onClickProfile = () => {
    history.push(`/profile`)
  }

  const onClickThemeIcon = (theme: string) => {
    changeUiTheme(theme)
  }

  const allowedRolesWithoutCandidate = allowedRoles?.filter(
    (el: number) => el !== (mapUserRoleEnumToKey as { [key: string]: number })[UserRole.CANDIDATE],
  )

  const handleNotifications = () => {
    if (isEnabledNotifications) {
      setIsEnabledNotifications(false)
      localStorage.setItem('isEnabledNotifications', 'false')
    } else {
      setIsEnabledNotifications(true)
      localStorage.setItem('isEnabledNotifications', 'true')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('isEnabledNotifications') === 'false') {
      setIsEnabledNotifications(false)
    }
  }, [])

  return (
    <div className={classNames.header} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <div className={classNames.menuIconWrapper}>
        <MenuIcon className={classNames.menuIcon} onClick={onToggleModal} />
      </div>

      <div className={classNames.toolbar}>
        <div className={classNames.titleWrapper}>
          <Typography key={SettingsModel.languageTag} className={classNames.title}>
            {title}
          </Typography>

          <div className={classNames.tooltipWrapper} onClick={onTriggerShowHints}>
            {showHints ? (
              <HintsOn
                className={cx(classNames.hintsIcon, classNames.hintsIconActive)}
                fontSize={'small'}
                viewBox={'0 0 18 18'}
              />
            ) : (
              <HintsOff className={classNames.hintsIcon} fontSize={'small'} viewBox={'0 0 18 18'} />
            )}
            {showHints ? (
              <Typography className={classNames.hintsTextActive}>{t(TranslationKey['Hints included'])}</Typography>
            ) : (
              <Typography className={classNames.hintsTextNoActive}>{t(TranslationKey['Hints are off'])}</Typography>
            )}
          </div>
        </div>

        <Typography className={classNames.userRoleTitle}>{t(TranslationKey['your role:'])}</Typography>

        <div className={classNames.allowedRolesMainWrapper}>
          {allowedRolesWithoutCandidate?.length > 1 ? (
            <div className={classNames.allowedRolesWrapper}>
              {allowedRolesWithoutCandidate?.map((roleCode: number) => (
                <Button
                  key={roleCode}
                  variant={'text'}
                  className={cx(classNames.allowedRolesItem, {
                    [classNames.currentAllowedRolesItem]: roleCode === role,
                  })}
                  onClick={() => onChangeUserInfo(roleCode)}
                >
                  {(UserRoleCodeMap as { [key: number]: string })[roleCode]}
                </Button>
              ))}
            </div>
          ) : (
            <Typography className={cx(classNames.userRole, classNames.currentAllowedRolesItem)}>
              {(UserRoleCodeMap as { [key: number]: string })[role]}
            </Typography>
          )}
        </div>

        <Divider orientation="vertical" className={classNames.hideOnModile} />

        <div className={classNames.selectorsWrapper}>
          {isEnabledNotifications ? (
            <NotificationsIcon className={classNames.notificationIcon} onClick={handleNotifications} />
          ) : (
            <NotificationsOffIcon className={classNames.notificationIcon} onClick={handleNotifications} />
          )}
          <LanguageSelector className={classNames.languageSelector} />

          {SettingsModel.uiTheme === UiTheme.light ? (
            <WbSunnyRoundedIcon className={classNames.themeIcon} onClick={() => onClickThemeIcon(UiTheme.dark)} />
          ) : (
            <Brightness3RoundedIcon className={classNames.themeIcon} onClick={() => onClickThemeIcon(UiTheme.light)} />
          )}
        </div>

        <Divider orientation="vertical" className={classNames.hideOnModile} />

        <div
          className={classNames.userInfoWrapper}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar className={classNames.avatar} src={getUserAvatarSrc(userId)} />

          <div className={classNames.userNameAndBalanceWrapper}>
            <Tooltip title={userName}>
              <Typography className={classNames.userName}>{getShortenStringIfLongerThanCount(userName, 10)}</Typography>
            </Tooltip>

            {!checkIsResearcher((UserRoleCodeMap as { [key: number]: string })[role]) && (
              <Typography className={classNames.balance}>{toFixedWithDollarSign(balance, 2)}</Typography>
            )}
          </div>
          <ArrowDropDownIcon className={classNames.hideOnModile} />
        </div>
      </div>

      <DialogModal open={Boolean(anchorEl)} onClose={handleClose}>
        <Menu
          keepMounted
          id="simple-menu"
          anchorEl={anchorEl}
          autoFocus={false}
          open={Boolean(anchorEl)}
          classes={{ root: classNames.menu, list: classNames.list }}
          onClose={handleClose}
        >
          <MenuItem className={classNames.menuClientInfoWrapper}>
            <div className={classNames.menuClientInfo}>
              <Typography className={classNames.menuClientInfoText}>
                {getShortenStringIfLongerThanCount(userName, 10)}
              </Typography>

              {!checkIsResearcher((UserRoleCodeMap as { [key: number]: string })[role]) && (
                <Typography className={classNames.menuClientInfoText}>{toFixedWithDollarSign(balance, 2)}</Typography>
              )}
            </div>

            <Avatar className={classNames.avatar} src={getUserAvatarSrc(userId)} />
          </MenuItem>
          <MenuItem className={classNames.mobileAllowedRolesWrapper}>
            <Typography className={classNames.mobileUserRoleTitle}>{t(TranslationKey['your role:'])}</Typography>
            {allowedRolesWithoutCandidate?.length > 1 ? (
              <div className={classNames.allowedRolesWrapper}>
                {allowedRolesWithoutCandidate?.map((roleCode: number) => (
                  <div key={roleCode} className={classNames.userRoleWrapper}>
                    {roleCode === role ? <span className={classNames.indicator}></span> : null}

                    <Typography
                      className={cx(classNames.userRole, {
                        [classNames.currentAllowedRolesItem]: roleCode === role,
                      })}
                      onClick={() => onChangeUserInfo(roleCode)}
                    >
                      {(UserRoleCodeMap as { [key: number]: string })[roleCode]}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <div className={classNames.userRoleWrapper}>
                <span className={classNames.indicator}></span>
                <Typography className={cx(classNames.userRole, classNames.currentAllowedRolesItem)}>
                  {(UserRoleCodeMap as { [key: number]: string })[role]}
                </Typography>
              </div>
            )}
          </MenuItem>

          <MenuItem className={classNames.menuItem} onClick={onClickProfile}>
            <PersonIcon className={classNames.icon} />
            {t(TranslationKey.Profile)}
          </MenuItem>
          <MenuItem className={classNames.menuItem} onClick={onClickExit}>
            <ExitIcon className={classNames.icon} />
            {t(TranslationKey.Exit)}
          </MenuItem>
        </Menu>
      </DialogModal>
    </div>
  )
})
