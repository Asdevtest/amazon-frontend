import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import React, {useRef, useState, useEffect} from 'react'

import {Drawer, Hidden, List} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {navbarConfig} from '@constants/navbar'
import {UserRoleCodeMap} from '@constants/user-roles'

import {SettingsModel} from '@models/settings-model'

import {NavbarCategory} from './navbar-category'
import {NavbarCollapse} from './navbar-collapse'
import {NavbarModel} from './navbar.model'
import {useClassNames} from './navbar.style'

export const Navbar = observer(
  ({activeCategory, activeSubCategory, drawerOpen, setDrawerOpen, onChangeSubCategory}) => {
    const classNames = useClassNames()
    const viewModel = useRef(new NavbarModel())

    const [curNavbar, setCurNavbar] = useState(navbarConfig())
    const [shortNavbar, setShortNavbar] = useState(false)
    useEffect(() => {
      setCurNavbar(navbarConfig())
    }, [SettingsModel.languageTag])

    const drawerContent = (
      <React.Fragment>
        {!shortNavbar ? (
          <div className={classNames.logoWrapper}>
            <img alt="company logo" className={classNames.logo} src={'/assets/icons/logo-01.08.svg'} />
          </div>
        ) : null}
        {!shortNavbar ? (
          <List className={classNames.categoriesWrapper}>
            {curNavbar[UserRoleCodeMap[viewModel.current.userInfo.role]].map((category, index) =>
              category.checkHideBlock(viewModel.current.userInfo) ? (
                <React.Fragment key={index}>
                  <NavbarCategory
                    button
                    isSelected={category.key === activeCategory}
                    userInfo={viewModel.current.userInfo}
                    category={category}
                    badge={
                      (category.route?.includes('/client/notifications') &&
                        viewModel.current.userInfo.needConfirmPriceChange.boxes +
                          viewModel.current.userInfo.needConfirmPriceChange.orders +
                          viewModel.current.userInfo.needUpdateTariff.boxes) ||
                      (category.route?.includes('/messages') && viewModel.current.unreadMessages)
                    }
                  />

                  <NavbarCollapse
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                    category={category}
                    index={category.key}
                    userInfo={viewModel.current.userInfo}
                    currentViewModel={viewModel.current}
                    onChangeSubCategory={onChangeSubCategory}
                  />
                </React.Fragment>
              ) : null,
            )}
          </List>
        ) : null}
      </React.Fragment>
    )
    return (
      <React.Fragment>
        <Hidden smDown>
          <Drawer
            open
            classes={{
              root: clsx(classNames.root, {[classNames.hideNavbar]: shortNavbar}),
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
        <div
          className={clsx(classNames.hideAndShowIconWrapper, {[classNames.hideAndShowIcon]: shortNavbar})}
          onClick={() => setShortNavbar(!shortNavbar)}
        >
          {shortNavbar ? (
            <ArrowForwardIosIcon color="primary" />
          ) : (
            <ArrowBackIosIcon className={classNames.arrowIcon} color="primary" />
          )}
        </div>
      </React.Fragment>
    )
  },
)
