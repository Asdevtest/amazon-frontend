/* eslint-disable @typescript-eslint/no-unused-vars */
// import NotificationsIcon from '@material-ui/icons/Notifications'
import {cx} from '@emotion/css'
import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded'
import PersonIcon from '@mui/icons-material/Person'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import {Avatar, Divider, Hidden, IconButton, Paper, Typography} from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement, useEffect, useRef, useState} from 'react'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import MenuIcon from '@material-ui/icons/Menu'
import {observer} from 'mobx-react'
import {useHistory, useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'

import {snackNoticeKey} from '@constants/snack-notifications'
import {HintsOff, HintsOn} from '@constants/svg-icons'
import {UiTheme} from '@constants/themes'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {SettingsModel} from '@models/settings-model'

import {BreadCrumbsLine} from '@components/bread-crumbs-line'
import {Button} from '@components/buttons/button'
import {LanguageSelector} from '@components/selectors/language-selector'
import {IdeaNotification} from '@components/snacks/idea-notification'
import {OrderDeadlineNotification} from '@components/snacks/order-deadline-notification'
import {OrdersUpdatesNotification} from '@components/snacks/orders-updates-notification/orders-updates-notification'
import {SimpleMessagesNotification} from '@components/snacks/simple-messages-notification'

import {checkIsResearcher} from '@utils/checks'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {getShortenStringIfLongerThanCount, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {AppbarModel} from './appbar.model'
import {useClassNames} from './appbar.style'

interface Props {
  avatarSrc: string
  title: string
  curUserRole: string
  setDrawerOpen: () => void
  lastCrumbAdditionalText?: string
  children: ReactElement
}

export const Appbar: FC<Props> = observer(({children, title, setDrawerOpen, lastCrumbAdditionalText}) => {
  const history = useHistory()
  const location = useLocation()
  const {classes: classNames} = useClassNames()
  const componentModel = useRef(new AppbarModel({history}))

  const {
    role,
    snackNotifications,
    clearSnackNoticeByKey: markNotificationAsReaded,
    onClickMessage,
    checkMessageIsRead,
  } = componentModel.current

  useEffect(() => {
    if (
      snackNotifications[snackNoticeKey.SIMPLE_MESSAGE] &&
      !location.pathname.includes('/messages') &&
      !checkMessageIsRead(snackNotifications[snackNoticeKey.SIMPLE_MESSAGE])
    ) {
      toast(
        <SimpleMessagesNotification
          noticeItem={snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]}
          onClickMessage={onClickMessage}
        />,
        {autoClose: 5000},
      )
      markNotificationAsReaded(snackNoticeKey.SIMPLE_MESSAGE)
    }

    if (snackNotifications[snackNoticeKey.ORDER_DEADLINE]) {
      toast(<OrderDeadlineNotification noticeItem={snackNotifications[snackNoticeKey.ORDER_DEADLINE]} />, {
        autoClose: 25000,
      })
      markNotificationAsReaded(snackNoticeKey.ORDER_DEADLINE)
    }

    if (snackNotifications[snackNoticeKey.IDEAS]) {
      toast(<IdeaNotification role={role} noticeItem={snackNotifications[snackNoticeKey.IDEAS]} />, {
        autoClose: 25000,
      })
      markNotificationAsReaded(snackNoticeKey.IDEAS)
    }

    if (snackNotifications[snackNoticeKey.ORDERS_UPDATES]) {
      toast(<OrdersUpdatesNotification noticeItem={snackNotifications[snackNoticeKey.ORDERS_UPDATES]} />, {
        autoClose: 25000,
      })
      markNotificationAsReaded(snackNoticeKey.ORDERS_UPDATES)
    }
  }, [snackNotifications])

  useEffect(() => {
    if (lastCrumbAdditionalText !== undefined) {
      localStorage.setItem('last', lastCrumbAdditionalText)
    }
  }, [lastCrumbAdditionalText])

  const savedLastCrumbAdditionalText = localStorage.getItem('last')

  // const renderNavbarButton = (
  //   <Hidden lgUp>
  //     <IconButton onClick={setDrawerOpen}>
  //       <MenuIcon classes={{root: classNames.menuIcon}} />
  //     </IconButton>
  //   </Hidden>
  // )

  useEffect(() => {
    if (location.pathname !== '/profile') {
      SettingsModel.setBreadcrumbsForProfile(location.pathname)
    }
  }, [location.pathname])

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleClick = (event: {currentTarget: HTMLDivElement}) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickExit = () => {
    handleClose()
    componentModel.current.onExitFromRole()
    history.push('/auth')
  }

  const onChangeUserInfo = (roleNun: number) => {
    componentModel.current.changeUserInfo({role: roleNun})
  }

  const onClickProfile = () => {
    history.push(`/profile`)
  }

  const onClickThemeIcon = (theme: string) => {
    componentModel.current.changeUiTheme(theme)
  }

  const allowedRolesWithoutCandidate = componentModel.current.allowedRoles?.filter(
    (el: number) => el !== (mapUserRoleEnumToKey as {[key: string]: number})[UserRole.CANDIDATE],
  )

  return (
    <React.Fragment>
      <div className={classNames.mainWrapper}>
        <Paper className={classNames.appbar}>
          <div className={classNames.toolbar}>
            {/* {renderNavbarButton} */}

            <div className={classNames.titleWrapper}>
              <Typography className={classNames.title}>{title}</Typography>
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
                      {(UserRoleCodeMap as {[key: number]: string})[roleCode]}
                    </Button>
                  ))}
                </div>
              ) : (
                <Typography className={cx(classNames.userrole, classNames.сurrentAllowedRolesItem)}>
                  {(UserRoleCodeMap as {[key: number]: string})[componentModel.current.role]}
                </Typography>
              )}
            </div>

            <Divider orientation="vertical" className={classNames.hideOnModile} />

            <div className={classNames.selectorsWrapper}>
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

                {!checkIsResearcher((UserRoleCodeMap as {[key: number]: string})[role]) && (
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
              classes={{paper: classNames.menu, list: classNames.list}}
              onClose={handleClose}
            >
              <MenuItem className={classNames.menuClientInfoWrapper}>
                <div className={classNames.menuClientInfo}>
                  <Typography className={classNames.menuClientInfoText}>
                    {getShortenStringIfLongerThanCount(componentModel.current.userName, 10)}
                  </Typography>

                  {!checkIsResearcher((UserRoleCodeMap as {[key: number]: string})[role]) && (
                    <Typography className={classNames.menuClientInfoText}>
                      {toFixedWithDollarSign(componentModel.current.balance, 2)}
                    </Typography>
                  )}
                </div>

                <Avatar className={classNames.avatar} src={getUserAvatarSrc(componentModel.current.userId)} />
              </MenuItem>
              <MenuItem className={classNames.mobileAllowedRolesWrapper}>
                <Typography className={classNames.mobileUserroleTitle}>{t(TranslationKey['your role:'])}</Typography>
                <div className={classNames.mobileAllowedRolesMainWrapper}>
                  {/* {!componentModel.current.masterUser ? ( */}
                  {/* <div className={classNames.allowedRolesWrapper}>
                {allowedRolesWithoutCandidate?.map((roleCode: number) => (
                  <Button
                    key={roleCode}
                    variant={'text'}
                    className={cx(classNames.allowedRolesItem, {
                      [classNames.сurrentAllowedRolesItem]: roleCode === componentModel.current.role,
                    })}
                    onClick={() => onChangeUserInfo(roleCode)}
                  >
                    {(UserRoleCodeMap as {[key: number]: string})[roleCode]}
                  </Button>
                ))}
              </div> */}
                  {/* ) : null} */}

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
                            {(UserRoleCodeMap as {[key: number]: string})[roleCode]}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={classNames.userRoleWrapper}>
                      <span className={classNames.indicator}></span>
                      <Typography className={cx(classNames.userrole, classNames.сurrentAllowedRolesItem)}>
                        {(UserRoleCodeMap as {[key: number]: string})[componentModel.current.role]}
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
                <img src="/assets/icons/ion_log-out.svg" className={classNames.icon} />

                {t(TranslationKey.Exit)}
              </MenuItem>
            </Menu>
          </div>
        </Paper>

        <div className={classNames.breadCrumbsWrapper}>
          <BreadCrumbsLine
            lastCrumbAdditionalText={lastCrumbAdditionalText}
            savedLastCrumbAdditionalText={savedLastCrumbAdditionalText}
          />
        </div>
      </div>

      {children}
    </React.Fragment>
  )
})
