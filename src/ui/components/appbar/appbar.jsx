import React from 'react'

import {Avatar, Divider, Paper, Typography, Hidden, IconButton} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import clsx from 'clsx'

import {Badge} from '@components/badge'

import {useClassNames} from './appbar.style'

export const Appbar = ({avatarSrc, children, handlerTriggerDrawer, title, username}) => {
  const classNames = useClassNames()

  const renderNavbarButton = (
    <Hidden mdUp>
      <IconButton onClick={handlerTriggerDrawer}>
        <MenuIcon />
      </IconButton>
    </Hidden>
  )

  const renderFooter = (
    <Paper className={clsx(classNames.appbar, classNames.footer)}>
      <Typography>{'Footer'}</Typography>
    </Paper>
  )
  return (
    <>
      <Paper className={classNames.appbar}>
        <div className={classNames.toolbar}>
          {renderNavbarButton}

          <Typography className={classNames.title}>{title}</Typography>

          <Divider orientation="vertical" />
          <Badge badgeContent={2} showZero>
            <NotificationsIcon color="action" />
          </Badge>
          <Divider orientation="vertical" />

          <div className={classNames.userInfoWrapper}>
            <Avatar alt="avatar" className={classNames.avatar} src={avatarSrc} />

            <Typography className={classNames.username}>{username}</Typography>
            <ArrowDropDownIcon color="action" />
          </div>
        </div>
      </Paper>

      {children}

      {renderFooter}
    </>
  )
}
