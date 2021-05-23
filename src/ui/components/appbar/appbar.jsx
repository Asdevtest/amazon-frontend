import React, {useRef, useState} from 'react'

import {
  Avatar,
  ClickAwayListener,
  Divider,
  Grow,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core'
//	import AcUnitIcon from '@material-ui/icons/AcUnit';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'

/*	ЗАКОМЕНТИРОВАНО пока закоментирован AlertUpdate
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';*/
import {userPopperItems} from '@constants/mocks'
import {texts} from '@constants/texts'

//	import { AlertUpdate } from '../../pages/client/Inventory/Inventory.react'; //	19/05/2021 ПОДПИСКА НА КОНТЕКСТ
import {Card} from '../card'
import {NotificationItem} from '../notification-item'
import {useClassNames} from './appbar.style'
import {StyledBadge} from './styled-badge'

const MODIFIERS_CONFIG = {
  preventOverflow: {
    enabled: true,
    padding: '0',
  },
}

export const Appbar = ({
  title,
  notificationCount,
  avatarSrc,
  user,
  username,
  drawerWidth,
  setDrawerOpen,
  children,
  onHistory,
}) => {
  const classNames = useClassNames({drawerWidth})()

  const [notificationOpen, setNotification] = useState(false)
  const [menuOpen, setMenu] = useState(false)
  const menuAnchor = useRef(null)
  const notificationAnchor = useRef(null)

  const onClickMenuItem = () => {
    onHistory()
    setMenu(false)
  }

  /*	ЗАКОМЕНТИРОВАНО ЗАОДНО С AlertUpdate

  const {
    updateAlert,
    setUpdateAlert,
    successAlert,
    setSuccessAlert,
    currentAsin,
    setCurrentAsin
  } = useContext(AlertUpdate);*/

  return (
    <React.Fragment>
      <Paper classes={{root: classNames.appbar}}>
        <div className={classNames.toolbar}>
          <Hidden mdUp>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon className={classNames.colorIcons} />
            </IconButton>
          </Hidden>
          <Typography className={classNames.title}>{title}</Typography>

          <Divider orientation="vertical" />
          <div
            className={classNames.notificationWrapper}
            onClick={() => setNotification(!notificationOpen)}
            ref={notificationAnchor}
          >
            <StyledBadge badgeContent={notificationCount || 0} showZero>
              <NotificationsIcon className={classNames.colorIcons} />
            </StyledBadge>
          </div>
          <Popper
            anchorEl={notificationAnchor.current}
            disablePortal
            modifiers={MODIFIERS_CONFIG}
            open={notificationOpen}
            placement="bottom-end"
            transition
          >
            {({TransitionProps}) => (
              <Grow {...TransitionProps} className={classNames.growWrapper}>
                <Card className={classNames.card}>
                  <ClickAwayListener onClickAway={() => setNotification(false)}>
                    <MenuList className={classNames.notificationList} disablePadding id="menu-list-grow">
                      <MenuItem onClick={() => setNotification(false)}>
                        <NotificationItem title={texts.ru.addGood} />
                      </MenuItem>
                      <Divider orientation="horizontal" />
                      <MenuItem onClick={() => setNotification(false)}>
                        <NotificationItem
                          title={
                            <span>
                              {texts.ru.statusStart}
                              <span className={classNames.notificationSpan}>{texts.ru.statusEnd}</span>
                            </span>
                          }
                        />
                      </MenuItem>
                      <Divider orientation="horizontal" />
                      <MenuItem onClick={() => setNotification(false)}>
                        <NotificationItem title={texts.ru.sendGood} />
                      </MenuItem>
                      <Divider orientation="horizontal" />
                      <MenuItem onClick={() => setNotification(false)}>
                        <Typography className={(classNames.menuItemText, classNames.viewAllNotification)}>
                          {texts.ru.allNotifications}
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Card>
              </Grow>
            )}
          </Popper>
          <Divider orientation="vertical" />

          <div className={classNames.userInfoContainer}>
            <div className={classNames.userInfoWrapper} onClick={() => setMenu(!menuOpen)} ref={menuAnchor}>
              <Avatar alt="avatar" className={classNames.avatar} src={avatarSrc} />

              <Typography className={classNames.username}>{username}</Typography>
              <ArrowDropDownIcon className={classNames.colorIcons} />
            </div>
            <Popper
              anchorEl={menuAnchor.current}
              disablePortal
              modifiers={MODIFIERS_CONFIG}
              open={menuOpen}
              placement="bottom-start"
              transition
            >
              {({TransitionProps}) => (
                <Grow {...TransitionProps} className={classNames.cardContainer}>
                  <Card className={classNames.card}>
                    <ClickAwayListener onClickAway={() => setMenu(false)}>
                      <MenuList className={classNames.cardMenuList} disablePadding id="menu-list-grow">
                        {userPopperItems[user].map((item, i) => (
                          <MenuItem
                            className={classNames.menuItemText}
                            key={i}
                            onClick={onClickMenuItem}
                            style={{color: item.color}}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Card>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      </Paper>

      {children}

      <Paper classes={({root: classNames.appbar}, classNames.comissons)}>
        {/*	 
            ЗАКОМЕНТИРОВАНО ЗАОДНО С AlertUpdate
        <Box>
          {updateAlert && (
            <Alert severity="warning" variant="outlined">
              ASIN {currentAsin} обновление комиссии
            </Alert>
          )}
          {successAlert && (
            <Alert severity="success" variant="outlined">
              ASIN {currentAsin} успешно обновлен
            </Alert>
          )}
        </Box>*/}
      </Paper>
    </React.Fragment>
  )
}
