import React, {useRef} from 'react'

import {Divider, Drawer, Hidden, List} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {navbarConfig} from '@constants/navbar'

import {NavbarCategory} from './navbar-category'
import {NavbarCollapse} from './navbar-collapse'
import {NavbarModel} from './navbar.model'
import {useClassNames} from './navbar.style'

export const Navbar = observer(
  ({activeCategory, activeSubCategory, curUserRole, drawerOpen, setDrawerOpen, onChangeSubCategory}) => {
    const classNames = useClassNames()
    const viewModel = useRef(new NavbarModel({curUserRole}))
    const drawerContent = (
      <React.Fragment>
        <div className={classNames.logoWrapper}>
          <img alt="company logo" className={classNames.logo} src={'/logo192.png'} />
        </div>
        <Divider />

        <List className={classNames.categoriesWrapper}>
          {navbarConfig[curUserRole].map((category, index) =>
            category.checkHideBlock(viewModel.current.userInfo) ? (
              <React.Fragment key={index}>
                <NavbarCategory
                  button
                  isSelected={category.key === activeCategory}
                  to={category.route}
                  icon={category.icon}
                  title={category.title}
                  badge={
                    category.route === '/client/orders-notifications' && viewModel.current.ordersNotificationsAmount
                  }
                />

                <NavbarCollapse
                  activeCategory={activeCategory}
                  activeSubCategory={activeSubCategory}
                  category={category}
                  index={category.key}
                  userInfo={viewModel.current.userInfo}
                  onChangeSubCategory={onChangeSubCategory}
                />
              </React.Fragment>
            ) : null,
          )}
        </List>
      </React.Fragment>
    )
    return (
      <React.Fragment>
        <Hidden smDown>
          <Drawer
            open
            classes={{
              root: classNames.root,
              paper: clsx(classNames.paper, classNames.positionStatic),
            }}
            variant="permanent"
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer
            anchor="left"
            classes={{root: classNames.root, paper: classNames.paper}}
            open={drawerOpen}
            onClose={setDrawerOpen}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </React.Fragment>
    )
  },
)
