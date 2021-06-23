import React from 'react'

import {Divider, Drawer, Hidden, List} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {navbarConfig} from '@constants/navbar'

import {NavbarCategory} from './navbar-category'
import {NavbarCollapse} from './navbar-collapse'
import {useClassNames} from './navbar.style'

export const Navbar = observer(
  ({activeCategory, activeSubCategory, curUserRole, drawerOpen, handlerTriggerDrawer, onChangeSubCategory}) => {
    const classNames = useClassNames()

    const drawerContent = (
      <React.Fragment>
        <div className={classNames.logoWrapper}>
          <img alt="company logo" className={classNames.logo} src={'/logo192.png'} />
        </div>
        <Divider />
        <List className={classNames.categoriesWrapper}>
          {navbarConfig[curUserRole].map((category, index) => (
            <React.Fragment key={index}>
              <NavbarCategory
                button
                isSelected={index === activeCategory}
                to={category.route}
                icon={category.icon}
                title={category.title}
              />

              <NavbarCollapse
                activeCategory={activeCategory}
                activeSubCategory={activeSubCategory}
                category={category}
                index={index}
                onChangeSubCategory={onChangeSubCategory}
              />
            </React.Fragment>
          ))}
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
            onClose={handlerTriggerDrawer}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </React.Fragment>
    )
  },
)
