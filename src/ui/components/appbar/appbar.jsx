import React from 'react'

import {Avatar, Divider, Paper, Typography, Hidden, IconButton} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import {observer} from 'mobx-react'

import {Badge} from '@components/badge'

import {useClassNames} from './appbar.style'

export const Appbar = observer(({avatarSrc, children, handlerTriggerDrawer, title, username}) => {
  const classNames = useClassNames()

  const renderNavbarButton = (
    <Hidden mdUp>
      <IconButton onClick={handlerTriggerDrawer}>
        <MenuIcon />
      </IconButton>
    </Hidden>
  )

  return (
    <>
      <Paper className={classNames.appbar}>
        <div className={classNames.toolbar}>
          {renderNavbarButton}

          <Typography className={classNames.title}>{title}</Typography>

          <Divider orientation="vertical" />
          <Badge showZero badgeContent={2}>
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
    </>
  )
})
