/* eslint-disable @typescript-eslint/no-unused-vars */
import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { observer } from 'mobx-react'
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import PersonIcon from '@mui/icons-material/Person'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { Avatar, Divider, Paper, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { UserRole, UserRoleCodeMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { BreadCrumbsLine } from '@components/layout/bread-crumbs-line'
import { BoxesUpdatesNotification } from '@components/layout/notifications/boxes-updates-notification'
import { IdeaNotification } from '@components/layout/notifications/idea-notification'
import { OrderDeadlineNotification } from '@components/layout/notifications/order-deadline-notification'
import { OrdersUpdatesNotification } from '@components/layout/notifications/orders-updates-notification/orders-updates-notification'
import { SimpleMessagesNotification } from '@components/layout/notifications/simple-messages-notification'
import { Button } from '@components/shared/buttons/button'
import { LanguageSelector } from '@components/shared/selectors/language-selector'
import { HintsOff, HintsOn } from '@components/shared/svg-icons'

import { checkIsResearcher } from '@utils/checks'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { getShortenStringIfLongerThanCount, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './appbar.style'

import { AppbarModel } from './appbar.model'

interface Props {
  avatarSrc: string
  title: () => string
  curUserRole: string
  setDrawerOpen: () => void
  lastCrumbAdditionalText?: string
  children: ReactElement
}

export const Appbar: FC<Props> = observer(({ children, title, setDrawerOpen }) => {
  const history = useHistory()
  const location = useLocation()
  const { classes: classNames } = useClassNames()
  const componentModel = useRef(new AppbarModel({ history }))
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(true)

  const {
    role,
    snackNotifications,
    simpleMessageCrmItemId,
    clearSnackNoticeByKey: markNotificationAsReaded,
    onClickMessage,
    checkMessageIsRead,
    breadcrumbsAdditionalText,
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

  useEffect(() => {
    if (breadcrumbsAdditionalText !== undefined) {
      localStorage.setItem('lastBreadcrumbsText', breadcrumbsAdditionalText)
    }
  }, [breadcrumbsAdditionalText])

  const savedLastCrumbAdditionalText = localStorage.getItem('lastBreadcrumbsText')

  useEffect(() => {
    if (location.pathname !== '/profile') {
      SettingsModel.setBreadcrumbsForProfile(location.pathname)
    }
  }, [location.pathname])

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
    componentModel.current.onExitFromRole()
    history.push('/auth')
  }

  const onChangeUserInfo = (roleNun: number) => {
    componentModel.current.changeUserInfo({ role: roleNun })
  }

  const onClickProfile = () => {
    history.push(`/profile`)
  }

  const onClickThemeIcon = (theme: string) => {
    componentModel.current.changeUiTheme(theme)
  }

  const allowedRolesWithoutCandidate = componentModel.current.allowedRoles?.filter(
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
    <React.Fragment>
      <div className={classNames.mainWrapper}>
        <Paper className={classNames.appbar}>
          <div className={classNames.toolbar}>
            <div className={classNames.titleWrapper}>
              <Typography key={SettingsModel.languageTag} className={classNames.title}>
                {title()}
              </Typography>
              <div className={classNames.tooltipWrapper} onClick={componentModel.current.onTriggerShowHints}>
                {componentModel.current.showHints ? (
                  <HintsOn
                    className={cx(classNames.hintsIcon, classNames.hintsIconActive)}
                    fontSize={'small'}
                    viewBox={'0 0 18 18'}
                  />
                ) : (
                  <HintsOff className={classNames.hintsIcon} fontSize={'small'} viewBox={'0 0 18 18'} />
                )}
                {componentModel.current.showHints ? (
                  <Typography className={classNames.hintsTextActive}>{t(TranslationKey['Hints included'])}</Typography>
                ) : (
                  <Typography className={classNames.hintsTextNoActive}>{t(TranslationKey['Hints are off'])}</Typography>
                )}
              </div>
            </div>

            <Typography className={classNames.userroleTitle}>{t(TranslationKey['your role:'])}</Typography>

            <div className={classNames.allowedRolesMainWrapper}>
              {allowedRolesWithoutCandidate?.length > 1 ? (
                <div className={classNames.allowedRolesWrapper}>
                  {allowedRolesWithoutCandidate?.map((roleCode: number) => (
                    <Button
                      key={roleCode}
                      variant={'text'}
                      className={cx(classNames.allowedRolesItem, {
                        [classNames.сurrentAllowedRolesItem]: roleCode === componentModel.current.role,
                      })}
                      onClick={() => onChangeUserInfo(roleCode)}
                    >
                      {(UserRoleCodeMap as { [key: number]: string })[roleCode]}
                    </Button>
                  ))}
                </div>
              ) : (
                <Typography className={cx(classNames.userrole, classNames.сurrentAllowedRolesItem)}>
                  {(UserRoleCodeMap as { [key: number]: string })[componentModel.current.role]}
                </Typography>
              )}
            </div>

            <Divider orientation="vertical" className={classNames.hideOnModile} />

            <div className={classNames.selectorsWrapper}>
              {isEnabledNotifications ? (
                <NotificationsIcon className={classNames.notificationHandler} onClick={handleNotifications} />
              ) : (
                <NotificationsOffIcon className={classNames.notificationHandler} onClick={handleNotifications} />
              )}
              <LanguageSelector />

              {SettingsModel.uiTheme === UiTheme.light ? (
                <WbSunnyRoundedIcon className={classNames.themeIcon} onClick={() => onClickThemeIcon(UiTheme.dark)} />
              ) : (
                <Brightness3RoundedIcon
                  className={classNames.themeIcon}
                  onClick={() => onClickThemeIcon(UiTheme.light)}
                />
              )}
            </div>

            <Divider orientation="vertical" className={classNames.hideOnModile} />

            <div
              className={classNames.userInfoWrapper}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar className={classNames.avatar} src={getUserAvatarSrc(componentModel.current.userId)} />

              <div className={classNames.usernameAndBalanceWrapper}>
                <Tooltip title={componentModel.current.userName}>
                  <Typography className={classNames.username}>
                    {getShortenStringIfLongerThanCount(componentModel.current.userName, 10)}
                  </Typography>
                </Tooltip>

                {!checkIsResearcher((UserRoleCodeMap as { [key: number]: string })[role]) && (
                  <Typography className={classNames.balance}>
                    {toFixedWithDollarSign(componentModel.current.balance, 2)}
                  </Typography>
                )}
              </div>
              <ArrowDropDownIcon className={classNames.hideOnModile} />
            </div>
          </div>

          <div>
            <Menu
              keepMounted
              id="simple-menu"
              anchorEl={anchorEl}
              autoFocus={false}
              open={Boolean(anchorEl)}
              classes={{ paper: classNames.menu, list: classNames.list }}
              onClose={handleClose}
            >
              <MenuItem className={classNames.menuClientInfoWrapper}>
                <div className={classNames.menuClientInfo}>
                  <Typography className={classNames.menuClientInfoText}>
                    {getShortenStringIfLongerThanCount(componentModel.current.userName, 10)}
                  </Typography>

                  {!checkIsResearcher((UserRoleCodeMap as { [key: number]: string })[role]) && (
                    <Typography className={classNames.menuClientInfoText}>
                      {toFixedWithDollarSign(componentModel.current.balance, 2)}
                    </Typography>
                  )}
                </div>

                <Avatar className={classNames.avatar} src={getUserAvatarSrc(componentModel.current.userId)} />
              </MenuItem>
              <MenuItem className={classNames.mobileAllowedRolesWrapper}>
                <Typography className={classNames.mobileUserroleTitle}>{t(TranslationKey['your role:'])}</Typography>
                <div>
                  {allowedRolesWithoutCandidate?.length > 1 ? (
                    <div className={classNames.allowedRolesWrapper}>
                      {allowedRolesWithoutCandidate?.map((roleCode: number) => (
                        <div key={roleCode} className={classNames.userRoleWrapper}>
                          {roleCode === componentModel.current.role ? (
                            <span className={classNames.indicator}></span>
                          ) : null}

                          <Typography
                            className={cx(classNames.userrole, {
                              [classNames.сurrentAllowedRolesItem]: roleCode === componentModel.current.role,
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
                      <Typography className={cx(classNames.userrole, classNames.сurrentAllowedRolesItem)}>
                        {(UserRoleCodeMap as { [key: number]: string })[componentModel.current.role]}
                      </Typography>
                    </div>
                  )}
                </div>
              </MenuItem>
              <MenuItem className={classNames.menuWrapper} onClick={onClickProfile}>
                <PersonIcon className={classNames.icon} />
                {t(TranslationKey.Profile)}
              </MenuItem>

              <MenuItem className={classNames.menuWrapper} onClick={onClickExit}>
                <svg className={classNames.icon}>
                  <use href="/assets/icons/ion_log-out.svg#svg" />
                </svg>

                {t(TranslationKey.Exit)}
              </MenuItem>
            </Menu>
          </div>
        </Paper>

        <div className={classNames.breadCrumbsWrapper}>
          <BreadCrumbsLine
            lastCrumbAdditionalText={breadcrumbsAdditionalText}
            savedLastCrumbAdditionalText={savedLastCrumbAdditionalText}
          />
        </div>
      </div>

      {children}
    </React.Fragment>
  )
})
