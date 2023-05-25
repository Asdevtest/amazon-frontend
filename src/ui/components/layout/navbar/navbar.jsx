/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'
import { Drawer, Hidden, IconButton, List, Typography } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'

import MenuIcon from '@material-ui/icons/Menu'
import { observer } from 'mobx-react'

import { appVersion } from '@constants/app-version'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { navbarConfig } from '@constants/navigation/navbar'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { FeedBackModal } from '@components/modals/feedback-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Modal } from '@components/shared/modal'
import { Feedback } from '@components/shared/svg-icons'

import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'

import { NavbarCategory } from './navbar-category'
import { NavbarCollapse } from './navbar-collapse'
import { NavbarModel } from './navbar.model'
import { useClassNames } from './navbar.style'
import { ConfirmationModal } from '@components/modals/confirmation-modal'

export const Navbar = observer(
  ({ activeCategory, activeSubCategory, drawerOpen, setDrawerOpen, onChangeSubCategory }) => {
    const { classes: classNames } = useClassNames()

    const viewModel = useRef(new NavbarModel())

    const {
      confirmModalSettings,
      showFeedbackModal,
      showWarningModal,
      showConfirmModal,
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

    const renderNavbarButton = (
      <div className={cx(classNames.iconButtonWrapper, { [classNames.iconButtonWrapperLeft]: !shortNavbar })}>
        {shortNavbar && (
          <IconButton
            onClick={() => {
              setShortNavbar(!shortNavbar)
              setShowOverlayNavBar(!showOverlayNavBar)
            }}
          >
            <MenuIcon classes={{ root: classNames.menuIcon }} />
          </IconButton>
        )}

        {!shortNavbar && (
          <CloseIcon
            className={classNames.closeIcon}
            onClick={() => {
              setShortNavbar(!shortNavbar)
              setShowOverlayNavBar(!showOverlayNavBar)
            }}
          />
        )}
      </div>
    )

    const drawerContent = (
      <div className={cx(classNames.mainSubWrapper, { [classNames.reverseMainSubWrapper]: shortNavbar })}>
        {!shortNavbar ? (
          <div className={classNames.logoWrapper}>
            <img
              alt="company logo"
              className={classNames.logo}
              src={
                SettingsModel.uiTheme === UiTheme.light
                  ? '/assets/icons/logo-01.08.svg'
                  : '/assets/icons/dt-navbar-logo.svg'
              }
            />
          </div>
        ) : null}
        {/* {!shortNavbar ? ( */}
        <List className={classNames.categoriesWrapper}>
          {window.innerWidth < 1282 && renderNavbarButton}
          {curNavbar[UserRoleCodeMap[userInfo.role]]
            .filter(el => !el.route?.includes('/messages'))
            .map((category, index) =>
              category.checkHideBlock(userInfo) ? (
                <React.Fragment key={index}>
                  <NavbarCategory
                    button
                    isSelected={category.key === activeCategory}
                    shortNavbar={shortNavbar}
                    userInfo={userInfo}
                    category={category}
                    badge={
                      (category.route?.includes('/client/notifications') &&
                        userInfo.needConfirmPriceChange?.boxes +
                          userInfo.needConfirmPriceChange?.orders +
                          userInfo.needUpdateTariff?.boxes +
                          userInfo.updatesOnIdeas) ||
                      (category.route?.includes('/buyer/notifications') && userInfo.updatesOnIdeas) ||
                      (category.route?.includes('/client/my-orders/orders') &&
                        userInfo.purchaseOrderRequired?.length &&
                        userInfo.purchaseOrderRequired.length) ||
                      (category.route?.includes('/warehouse/tasks') &&
                        userInfo.tasksAtProcessAll + userInfo.tasksNewAll) ||
                      (category.route?.includes('/buyer/free-orders') && userInfo.freeOrders) ||
                      (category.route?.includes('/buyer/pending-orders') && userInfo.pendingOrders)
                    }
                  />

                  <NavbarCollapse
                    showHighPriorityNotification
                    shortNavbar={shortNavbar}
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                    category={category}
                    index={category.key}
                    userInfo={userInfo}
                    currentViewModel={viewModel.current}
                    onChangeSubCategory={onChangeSubCategory}
                  />
                </React.Fragment>
              ) : null,
            )}
        </List>
        {/* ) : null} */}

        <div className={classNames.bottomCategories}>
          {curNavbar[UserRoleCodeMap[userInfo.role]]
            .filter(el => el.route?.includes('/messages'))
            .map((category, index) =>
              category.checkHideBlock(userInfo) ? (
                <React.Fragment key={index}>
                  <NavbarCategory
                    button
                    shortNavbar={shortNavbar}
                    isSelected={category.key === activeCategory}
                    userInfo={userInfo}
                    category={category}
                    badge={category.route?.includes('/messages') && viewModel.current.unreadMessages}
                  />
                </React.Fragment>
              ) : null,
            )}

          {/* {!checkIsAdmin(UserRoleCodeMap[userInfo.role]) && !shortNavbar ? (
            <div className={classNames.feedBackButton} onClick={() => onTriggerOpenModal('showFeedbackModal')}>
              <Typography className={classNames.feedBackText}>{t(TranslationKey.Feedback)}</Typography>
              <Feedback className={classNames.feedbackIcon} />
            </div>
          ) : null} */}

          {!checkIsAdmin(UserRoleCodeMap[userInfo.role]) ? (
            <div
              className={cx(classNames.feedBackButton, { [classNames.shortFeedBackButton]: shortNavbar })}
              onClick={() => onTriggerOpenModal('showFeedbackModal')}
            >
              {!shortNavbar && (
                <Typography className={classNames.feedBackText}>{t(TranslationKey.Feedback)}</Typography>
              )}
              <Feedback className={classNames.feedbackIcon} />
            </div>
          ) : null}

          <Typography
            className={cx(classNames.appVersion, { [classNames.smallAppVersion]: shortNavbar })}
            onClick={onClickVersion}
          >
            {appVersion}
          </Typography>
        </div>

        {/* <Typography className={classNames.appVersion}>{appVersion}</Typography>

        {!checkIsAdmin(UserRoleCodeMap[userInfo.role]) && !shortNavbar ? (
          <div className={classNames.feedBackButton} onClick={() => onTriggerOpenModal('showFeedbackModal')}>
            <Typography className={classNames.feedBackText}>{t(TranslationKey.Feedback)}</Typography>
            <Feedback className={classNames.feedbackIcon} />
          </div>
        ) : null} */}

        <Modal openModal={showFeedbackModal} setOpenModal={() => onTriggerOpenModal('showFeedbackModal')}>
          <FeedBackModal onSubmit={sendFeedbackAboutPlatform} onClose={() => onTriggerOpenModal('showFeedbackModal')} />
        </Modal>

        <WarningInfoModal
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={t(TranslationKey['Your feedback has been sent and will be reviewed shortly'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          isWarning={confirmModalSettings.isWarning}
          title={confirmModalSettings.confirmTitle}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </div>
    )
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
            {drawerContent}
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
            {drawerContent}
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
