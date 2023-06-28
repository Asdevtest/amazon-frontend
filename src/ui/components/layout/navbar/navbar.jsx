/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Drawer } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { navbarConfig } from '@constants/navigation/navbar'

import { SettingsModel } from '@models/settings-model'
import { NavbarModel } from './navbar.model'
import { useClassNames } from './navbar.style'
import { NavbarDrawerContent } from '@components/layout/navbar/navbar-drawer-content'

export const Navbar = observer(
  ({ activeCategory, activeSubCategory, drawerOpen, setDrawerOpen, onChangeSubCategory }) => {
    const { classes: classNames } = useClassNames()

    const viewModel = useRef(new NavbarModel())

    const {
      confirmModalSettings,
      showFeedbackModal,
      showWarningModal,
      showConfirmModal,
      alertShieldSettings,
      onTriggerOpenModal,
      sendFeedbackAboutPlatform,
      onClickVersion,
      userInfo,
    } = viewModel.current

    const [showOverlayNavBar, setShowOverlayNavBar] = useState(false)

    const [curNavbar, setCurNavbar] = useState(navbarConfig())
    const [shortNavbar, setShortNavbar] = useState(() => {
      const saved = localStorage.getItem('shortNavbar')
      const initialValue = JSON.parse(saved)
      return initialValue || window.innerWidth < 1282 ? true : false
    })
    useEffect(() => {
      setCurNavbar(navbarConfig())
    }, [SettingsModel.languageTag])

    useEffect(() => {
      localStorage.setItem('shortNavbar', JSON.stringify(shortNavbar))
    }, [shortNavbar])

    return (
      <div className={classNames.mainWrapper}>
        {!showOverlayNavBar && (
          <Drawer
            open={false}
            classes={{
              root: cx(classNames.root, { [classNames.hideNavbar]: shortNavbar }),
              paper: cx(classNames.paper, classNames.positionStatic),
            }}
            variant="permanent"
          >
            <NavbarDrawerContent
              shortNavbar={shortNavbar}
              setShortNavbar={setShortNavbar}
              showOverlayNavBar={showOverlayNavBar}
              setShowOverlayNavBar={setShowOverlayNavBar}
              confirmModalSettings={confirmModalSettings}
              alertShieldSettings={alertShieldSettings}
              curNavbar={curNavbar}
              userInfo={userInfo}
              activeCategory={activeCategory}
              viewModel={viewModel.current}
              activeSubCategory={activeSubCategory}
              sendFeedbackAboutPlatform={sendFeedbackAboutPlatform}
              showFeedbackModal={showFeedbackModal}
              showWarningModal={showWarningModal}
              showConfirmModal={showConfirmModal}
              onTriggerOpenModal={onTriggerOpenModal}
              onChangeSubCategory={onChangeSubCategory}
              onClickVersion={onClickVersion}
            />
          </Drawer>
        )}

        {showOverlayNavBar && (
          <Drawer
            open
            anchor="left"
            classes={{
              root: classNames.root,
              paper: cx(classNames.paper, { [classNames.moreWidth]: window.innerWidth < 1282 }),
            }}
            onClose={() => {
              setDrawerOpen()
              setShortNavbar(!shortNavbar)
              setShowOverlayNavBar(!showOverlayNavBar)
            }}
          >
            <NavbarDrawerContent
              shortNavbar={shortNavbar}
              setShortNavbar={setShortNavbar}
              showOverlayNavBar={showOverlayNavBar}
              setShowOverlayNavBar={setShowOverlayNavBar}
              alertShieldSettings={alertShieldSettings}
              confirmModalSettings={confirmModalSettings}
              curNavbar={curNavbar}
              userInfo={userInfo}
              activeCategory={activeCategory}
              viewModel={viewModel.current}
              activeSubCategory={activeSubCategory}
              sendFeedbackAboutPlatform={sendFeedbackAboutPlatform}
              showFeedbackModal={showFeedbackModal}
              showWarningModal={showWarningModal}
              showConfirmModal={showConfirmModal}
              onTriggerOpenModal={onTriggerOpenModal}
              onChangeSubCategory={onChangeSubCategory}
              onClickVersion={onClickVersion}
            />
          </Drawer>
        )}

        <div
          className={cx(classNames.hideAndShowIconWrapper, { [classNames.hideAndShowIcon]: shortNavbar })}
          onClick={() => setShortNavbar(!shortNavbar)}
        >
          {shortNavbar ? (
            <ArrowForwardIosIcon className={classNames.arrowIcon} />
          ) : (
            <ArrowBackIosIcon className={classNames.arrowIcon} />
          )}
        </div>
      </div>
    )
  },
)
