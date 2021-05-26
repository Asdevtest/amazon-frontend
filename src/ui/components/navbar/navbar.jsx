import React from 'react'

import {Divider, Drawer, Hidden, SvgIcon, List, ListItemIcon, ListItemText} from '@material-ui/core'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

import {NavbarCategory} from './navbar-category'
import {NavbarCollapse} from './navbar-collapse'
import {useClassNames} from './navbar.style'

export const Navbar = ({activeCategory, activeSubCategory, categoriesList, drawerOpen, handlerTriggerDrawer}) => {
  const classNames = useClassNames()

  const drawerContent = (
    <>
      <div className={classNames.logoWrapper}>
        <img alt="company logo" className={classNames.logo} src={'/logo192.png'} />
      </div>
      <Divider />
      <List disablePadding>
        {categoriesList.map((category, index) => (
          <React.Fragment key={index}>
            <NavbarCategory
              button
              disableGutters
              component={Link}
              selected={index === activeCategory}
              to={category.route}
            >
              <ListItemIcon
                className={clsx(classNames.iconWrapper, {
                  [classNames.selected]: index === activeCategory,
                })}
              >
                <SvgIcon className={classNames.icon} component={category.icon} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className={clsx({[classNames.selected]: index === activeCategory})}
                primary={category.title}
              />
            </NavbarCategory>

            <NavbarCollapse
              activeCategory={activeCategory}
              activeSubCategory={activeSubCategory}
              category={category}
              index={index}
            />
          </React.Fragment>
        ))}
      </List>
    </>
  )
  return (
    <>
      <Hidden smDown>
        <Drawer
          classes={{
            root: classNames.root,
            paper: clsx(classNames.paper, classNames.positionStatic),
          }}
          open
          classes={{root: classNames.root, paper: clsx(classNames.paper, classNames.positionStatic)}}
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
    </>
  )
}
