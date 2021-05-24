import React, {useState} from 'react'

import {Collapse, Divider, Drawer, List, ListItemText, ListItemIcon, SvgIcon, Hidden} from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'

import {CATEGORIES_LIST} from '@constants/mocks'

import logoSrc from './assets/logo.svg'
import {ListItem} from './list-item'
import {ListItemUser} from './list-item-user'
import {ListSubItem} from './list-sub-item'
import {useStyles} from './navbar-documentation.style'

export const Navbar = ({
  activeItem,
  setItem,
  activeSubItem,
  setSubItem,
  drawerWidth,
  drawerOpen,
  setDrawerOpen,
  refs,
}) => {
  const classes = useStyles({drawerWidth})()
  const [activeUser, setActiveUser] = useState(null)

  const ROUTES = {
    client: {
      0: {mainRoute: refs.clientMainRef},
      1: {
        mainRoute: refs.clientExchangeExchangeRef,
        0: refs.clientExchangeExchangeRef,
        1: refs.clientExchangePrivateLabelRef,
        2: refs.clientExchangeMyRequestsRef,
      },
      2: {mainRoute: refs.clientInventoryRef},
      3: {mainRoute: refs.clientOrdersRef},
      4: {mainRoute: refs.clientWarehouseRef},
      5: {
        mainRoute: refs.clientUsersMyProfileRef,
        0: refs.clientUsersMyProfileRef,
        1: refs.clientUsersMySubUsersRef,
      },
      6: {mainRoute: refs.clientSettingsRef},
      7: {mainRoute: refs.clientMessagesRef},
      8: {mainRoute: refs.clientFinanceRef},
      9: {mainRoute: refs.clientProductRef},
    },
    freelancer: {
      0: {mainRoute: refs.freelancerMainRef},
      1: {mainRoute: refs.freelancerOrdersRef},
      2: {mainRoute: refs.freelancerSettingsRef},
    },
    supervisor: {
      0: {mainRoute: refs.supervisorMainRef},
      1: {mainRoute: refs.supervisorReadyToCheckRef},
      2: {mainRoute: refs.supervisorProductsRef},
      3: {mainRoute: refs.supervisorSettingsRef},
    },
    buyer: {
      0: {mainRoute: refs.buyerProductsRef},
      1: {mainRoute: refs.buyerMyProductsRef},
      2: {
        mainRoute: refs.buyerOrdersMyOrdersRef,
        0: refs.buyerOrdersMyOrdersRef,
        1: refs.buyerOrdersFreeOrdersRef,
      },
      3: {mainRoute: refs.buyerWarehouseRef},
      4: {mainRoute: refs.buyerBatchesRef},
      5: {
        mainRoute: refs.buyerUsersMyProfileRef,
        0: refs.buyerUsersMyProfileRef,
        1: refs.buyerUsersMySubUsersRef,
      },
    },
    others: {
      0: {mainRoute: refs.authRef},
      1: {mainRoute: refs.registerRef},
    },
  }
  const userHandleClick = user => {
    if (activeUser === user) {
      setActiveUser(null)
      setItem(null)
    } else {
      setActiveUser(user)
    }
  }
  const itemHandleClick = (num, user) => {
    setItem(num)
    const ref = ROUTES[user][num].mainRoute
    ref.current.scrollIntoView({block: 'start', behavior: 'smooth'})
    setSubItem(0)
  }

  const subItemHandleClick = (num, subNum, user) => {
    setSubItem(subNum)
    const ref = ROUTES[user][num][subNum]
    ref.current.scrollIntoView({block: 'start', behavior: 'smooth'})
  }

  const DRAWER_CONTENT = (
    <React.Fragment>
      <div className={classes.logo}>
        <img alt="company logo" src={logoSrc} />
      </div>
      <Divider />
      <List disablePadding>
        {Object.entries(CATEGORIES_LIST).map(([user, userPages], userIndex) => (
          <React.Fragment key={userIndex}>
            <ListItemUser button disableGutters onClick={userHandleClick}>
              <ListItemText>{user.charAt(0).toUpperCase() + user.slice(1)}</ListItemText>
              {activeUser === user ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemUser>
            <Collapse in={activeUser === user} timeout="auto">
              {userPages.map((item, index) => (
                <React.Fragment key={'key' + index + item.title}>
                  <ListItem
                    button
                    disableGutters
                    onClick={() => itemHandleClick(index, user)}
                    selected={activeItem === index}
                  >
                    <ListItemIcon
                      className={clsx(classes.iconWrapper, {
                        [classes.selected]: activeItem === index,
                      })}
                    >
                      <SvgIcon className={classes.icon} component={item.icon} />
                    </ListItemIcon>
                    <ListItemText disableTypography primary={item.title} />
                  </ListItem>

                  {!!item.subtitles && (
                    <Collapse in={activeItem === index} timeout="auto">
                      <List disablePadding>
                        {item.subtitles.map((subItem, subIndex) => (
                          <ListSubItem
                            button
                            key={'subKey' + subIndex}
                            onClick={() => subItemHandleClick(index, subIndex, user)}
                            selected={activeSubItem === subIndex}
                          >
                            <ListItemText disableTypography primary={subItem} />
                          </ListSubItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <Hidden smDown>
        <Drawer classes={{root: classes.root, paper: classes.paper}} open variant="permanent">
          {DRAWER_CONTENT}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{root: classes.root, paper: classes.paper}}
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
        >
          {DRAWER_CONTENT}
        </Drawer>
      </Hidden>
    </React.Fragment>
  )
}
