import SettingsIcon from '@mui/icons-material/Settings'

import React, {useRef, useState, FC} from 'react'

import {Avatar, Divider, Paper, Typography, Hidden, IconButton} from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
// import NotificationsIcon from '@material-ui/icons/Notifications'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {BreadCrumbsLine} from '@components/bread-crumbs-line'
// import {Badge} from '@components/badge'
import {Button} from '@components/buttons/button'
import {LanguageSelector} from '@components/language-selector'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {AppbarModel} from './appbar.model'
import {useClassNames} from './appbar.style'

interface Props {
  avatarSrc: string
  title: string
  curUserRole: string
  setDrawerOpen: () => void
}

export const Appbar: FC<Props> = observer(({children, title, setDrawerOpen}) => {
  const history = useHistory()
  const classNames = useClassNames()
  const componentModel = useRef(new AppbarModel())

  const renderNavbarButton = (
    <Hidden mdUp>
      <IconButton onClick={setDrawerOpen}>
        <MenuIcon />
      </IconButton>
    </Hidden>
  )

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
    history.push('/nonexistent-address') // для перехода на разрешенный роут другой роли
  }

  const onClickProfile = () => {
    history.push('/profile')
  }

  const allowedRolesWithoutCandidate = componentModel.current.allowedRoles?.filter(
    (el: number) => el !== (mapUserRoleEnumToKey as {[key: string]: number})[UserRole.CANDIDATE],
  )

  return (
    <React.Fragment>
      <div className={classNames.mainWrapper}>
        <Paper className={classNames.appbar}>
          <div className={classNames.toolbar}>
            {renderNavbarButton}

            <div className={classNames.titleWrapper}>
              <Typography className={classNames.title}>{title}</Typography>

              <img
                className={classNames.hintsIcon}
                src={componentModel.current.showHints ? '/assets/icons/hints-on.svg' : '/assets/icons/hints-off.svg'}
                onClick={componentModel.current.onTriggerShowHints}
              />
            </div>

            <Typography className={classNames.userroleTitle}>{t(TranslationKey['your role:'])}</Typography>

            <div className={classNames.allowedRolesMainWrapper}>
              {/* {!componentModel.current.masterUser ? ( */}
              <div className={classNames.allowedRolesWrapper}>
                {allowedRolesWithoutCandidate?.map((roleCode: number) => (
                  <Button
                    key={roleCode}
                    variant={'text'}
                    className={clsx(classNames.allowedRolesItem, {
                      [classNames.сurrentAllowedRolesItem]: roleCode === componentModel.current.role,
                    })}
                    onClick={() => onChangeUserInfo(roleCode)}
                  >
                    {(UserRoleCodeMap as {[key: number]: string})[roleCode]}
                  </Button>
                ))}
              </div>
              {/* ) : null} */}

              {/* {(!allowedRolesWithoutCandidate?.length || componentModel.current.masterUser) && (
                <Typography className={clsx(classNames.userrole, classNames.сurrentAllowedRolesItem)}>
                  {(UserRoleCodeMap as {[key: number]: string})[componentModel.current.role]}
                </Typography>
              )} */}
            </div>

            <Divider orientation="vertical" />
            {/* <Badge showZero badgeContent={2}>
            <NotificationsIcon color="action" />
          </Badge> */}

            <div className={classNames.languageSelectorWrapper}>
              <LanguageSelector />
            </div>

            <Divider orientation="vertical" />

            <div
              className={classNames.userInfoWrapper}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar className={classNames.avatar} src={getUserAvatarSrc(componentModel.current.userId)} />

              <div className={classNames.usernameAndBalanceWrapper}>
                <Typography className={classNames.username}>{componentModel.current.userName}</Typography>
                {componentModel.current.balance && (
                  <Typography className={classNames.balance}>
                    {toFixedWithDollarSign(componentModel.current.balance, 2)}
                  </Typography>
                )}
              </div>
              <ArrowDropDownIcon color="action" />
            </div>
          </div>

          <div>
            <Menu keepMounted id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <Typography className={classNames.menuTitle}>{t(TranslationKey.Menu)}</Typography>

              {
                <MenuItem className={classNames.menuWrapper} onClick={onClickProfile}>
                  <SettingsIcon color="primary" />
                  {t(TranslationKey.Profile)}
                </MenuItem>
              }

              <MenuItem className={classNames.menuWrapper} onClick={onClickExit}>
                <ExitToAppIcon color="primary" />
                {t(TranslationKey.Exit)}
              </MenuItem>
            </Menu>
          </div>
        </Paper>

        {/* <div className={classNames.breadCrumbsWrapper}>
          <BreadCrumbsLine />
        </div> */}
      </div>

      {children}
    </React.Fragment>
  )
})
