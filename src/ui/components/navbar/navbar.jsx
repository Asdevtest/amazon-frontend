import React from 'react'

import {Collapse, Divider, Drawer, Hidden, SvgIcon, List, ListItemIcon, ListItemText} from '@material-ui/core'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

import {NavbarCategory} from './navbar-category'
import {NavbarSubCategory} from './navbar-sub-category'
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
              <ListItemIcon className={clsx(classNames.iconWrapper, {[classNames.selected]: index === activeCategory})}>
                <SvgIcon className={classNames.icon} component={category.icon}></SvgIcon>
              </ListItemIcon>
              <ListItemText
                disableTypography
                className={clsx({[classNames.selected]: index === activeCategory})}
                primary={category.title}
              />
            </NavbarCategory>

            <Collapse in={index === activeCategory}>
              <List disablePadding>
                {category.subtitles?.map((subCategory, subIndex) => (
                  <NavbarSubCategory
                    key={subIndex}
                    button
                    disableGutters
                    component={Link}
                    selected={subIndex === activeSubCategory}
                    to={subCategory.subRoute}
                  >
                    <ListItemText
                      disableTypography
                      className={clsx({[classNames.selected]: subIndex === activeSubCategory})}
                      primary={subCategory.subtitle}
                    />
                  </NavbarSubCategory>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </>
  )
  return (
    <>
      <Hidden smDown>
        <Drawer
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
