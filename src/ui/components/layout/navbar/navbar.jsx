import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { navbarConfig } from '@constants/navigation/navbar'

import { SettingsModel } from '@models/settings-model'

import { NavbarDrawerContent } from '@components/layout/navbar/navbar-drawer-content'

import { useClassNames } from './navbar.style'

import { NavbarModel } from './navbar.model'

export const Navbar = observer(
  ({ shortNavbar, setShortNavbar, activeCategory, activeSubCategory, onChangeSubCategory }) => {
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

    useEffect(() => {
      setCurNavbar(navbarConfig())
    }, [SettingsModel.languageTag])

    return (
      <div className={classNames.mainWrapper}>
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
