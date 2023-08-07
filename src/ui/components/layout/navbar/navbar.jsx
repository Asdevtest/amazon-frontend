import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { navbarConfig } from '@constants/navigation/navbar'

import { SettingsModel } from '@models/settings-model'

import { NavbarDrawerContent } from '@components/layout/navbar/navbar-drawer-content'
import { DrawerModal } from '@components/shared/drawer-modal'
import { LogoIcon, ShortLogoIcon } from '@components/shared/svg-icons'

import { NavbarModel } from './navbar.model'
import { useClassNames } from './navbar.styles'

export const Navbar = observer(
  ({
    shortNavbar,
    activeCategory,
    isHovering,
    activeSubCategory,
    isOpenModal,
    onMouseOver,
    onMouseOut,
    onShowNavbar,
    onToggleModal,
  }) => {
    const { classes: classNames } = useClassNames()

    const viewModel = useRef(new NavbarModel())

    const {
      userInfo,
      confirmModalSettings,
      showFeedbackModal,
      showWarningModal,
      showConfirmModal,
      alertShieldSettings,
      onTriggerOpenModal,
      sendFeedbackAboutPlatform,
      onClickVersion,
    } = viewModel.current

    const [curNavbar, setCurNavbar] = useState(navbarConfig())

    useEffect(() => {
      setCurNavbar(navbarConfig())
    }, [SettingsModel.languageTag])

    return (
      <div className={classNames.navbar} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <div className={classNames.logoWrapper}>
          {shortNavbar ? (
            <ShortLogoIcon className={classNames.logoIconShort} />
          ) : (
            <LogoIcon className={classNames.logoIcon} />
          )}
          {isHovering && (
            <div
              className={cx(classNames.hideAndShowIconWrapper, { [classNames.hideAndShowIcon]: shortNavbar })}
              onClick={onShowNavbar}
            >
              {shortNavbar ? (
                <ArrowForwardIosIcon className={classNames.arrowIcon} />
              ) : (
                <ArrowBackIosIcon className={classNames.arrowIcon} />
              )}
            </div>
          )}
        </div>

        <DrawerModal position="left" open={isOpenModal} onClose={onToggleModal}>
          <NavbarDrawerContent
            shortNavbar={shortNavbar}
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
            onClickVersion={onClickVersion}
            onToggleModal={onToggleModal}
          />
        </DrawerModal>
      </div>
    )
  },
)
