/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState} from 'react'

import {Avatar, Divider, Paper, Typography, Hidden, IconButton} from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Badge} from '@components/badge'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {AppbarModel} from './appbar.model'
import {useClassNames} from './appbar.style'

const textConsts = getLocalizedTexts(texts, 'ru').appbarTexts

export const Appbar = observer(({avatarSrc, children, title, username, curUserRole, setDrawerOpen, history}) => {
  const classNames = useClassNames()
  const componentModel = useRef(new AppbarModel({userRole: curUserRole}))

  const renderNavbarButton = (
    <Hidden mdUp>
      <IconButton onClick={setDrawerOpen}>
        <MenuIcon />
      </IconButton>
    </Hidden>
  )

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
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

  return (
    <React.Fragment>
      <Paper className={classNames.appbar}>
        <div className={classNames.toolbar}>
          {renderNavbarButton}

          <Typography className={classNames.title}>{title}</Typography>

          <Divider orientation="vertical" />
          <Badge showZero badgeContent={2}>
            <NotificationsIcon color="action" />
          </Badge>
          <Divider orientation="vertical" />

          <div
            className={classNames.userInfoWrapper}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {avatarSrc ? <Avatar alt="avatar" className={classNames.avatar} src={avatarSrc} /> : undefined}

            <div className={classNames.usernameAndBalanceWrapper}>
              <Typography className={classNames.username}>{username}</Typography>
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
            <Typography className={classNames.menuTitle}>{textConsts.menuTitle}</Typography>
            <MenuItem className={classNames.menuWrapper} onClick={onClickExit}>
              <ExitToAppIcon color="primary" />
              {textConsts.exit}
            </MenuItem>
          </Menu>
        </div>
      </Paper>

      {children}
    </React.Fragment>
  )
})
