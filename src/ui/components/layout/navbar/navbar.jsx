import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { navbarConfig } from '@constants/navigation/navbar'

import { SettingsModel } from '@models/settings-model'

import { NavbarDrawerContent } from '@components/layout/navbar/navbar-drawer-content'
import { DrawerModal } from '@components/shared/drawer-modal'
import { LogoIcon } from '@components/shared/svg-icons'

import { useClassNames } from './navbar.styles'

import { NavbarModel } from './navbar.model'

export const Navbar = observer(
  ({ shortNavbar, activeCategory, activeSubCategory, isOpenModal, onShowNavbar, onToggleModal }) => {
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
      <div className={classNames.navbar}>
        <div className={cx(classNames.logoWrapper, { [classNames.logoWrapperShort]: shortNavbar })}>
          <LogoIcon className={cx(classNames.logoIcon, { [classNames.logoIconNotShow]: shortNavbar })} />
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
