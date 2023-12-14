import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { navbarConfig } from '@constants/navigation/navbar'

import { NavbarDrawerContent } from '@components/layout/navbar/navbar-drawer-content'
import { DrawerModal } from '@components/shared/drawer-modal'
import { LogoIcon, ShortLogoIcon } from '@components/shared/svg-icons'

import { useStyles } from './navbar.styles'

import { NavbarModel } from './navbar.model'

export const Navbar = observer(
  ({ shortNavbar, activeCategory, activeSubCategory, isOpenModal, onShowNavbar, onToggleModal }) => {
    const { classes: styles } = useStyles()
    const [viewModel] = useState(new NavbarModel())

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
    } = viewModel

    const [curNavbar] = useState(navbarConfig)

    return (
      <div className={styles.navbar}>
        <div className={styles.logoWrapper}>
          {shortNavbar ? <ShortLogoIcon className={styles.logoIconShort} /> : <LogoIcon className={styles.logoIcon} />}
          <div
            id="hideAndShowIcon"
            className={cx(styles.hideAndShowIconWrapper, { [styles.hideAndShowIcon]: shortNavbar })}
            onClick={onShowNavbar}
          >
            {shortNavbar ? (
              <ArrowForwardIosIcon className={styles.arrowIcon} />
            ) : (
              <ArrowBackIosIcon className={styles.arrowIcon} />
            )}
          </div>
        </div>

        <DrawerModal open={isOpenModal} onClose={onToggleModal}>
          <NavbarDrawerContent
            shortNavbar={shortNavbar}
            alertShieldSettings={alertShieldSettings}
            confirmModalSettings={confirmModalSettings}
            curNavbar={curNavbar}
            userInfo={userInfo}
            activeCategory={activeCategory}
            unreadMessages={viewModel.unreadMessages}
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
