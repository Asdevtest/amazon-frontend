import {cx} from '@emotion/css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {Drawer, Hidden, List, Typography} from '@mui/material'

import React, {useRef, useState, useEffect} from 'react'

import {observer} from 'mobx-react'

import {appVersion} from '@constants/app-version'
import {navbarConfig} from '@constants/navbar'
import {Feedback} from '@constants/svg-icons'
import {UiTheme} from '@constants/themes'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap} from '@constants/user-roles'

import {SettingsModel} from '@models/settings-model'

import {Modal} from '@components/modal'
import {FeedBackModal} from '@components/modals/feedback-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {checkIsAdmin} from '@utils/checks'
import {t} from '@utils/translations'

import {NavbarCategory} from './navbar-category'
import {NavbarCollapse} from './navbar-collapse'
import {NavbarModel} from './navbar.model'
import {useClassNames} from './navbar.style'

export const Navbar = observer(
  ({activeCategory, activeSubCategory, drawerOpen, setDrawerOpen, onChangeSubCategory}) => {
    const {classes: classNames} = useClassNames()

    const viewModel = useRef(new NavbarModel())

    const {showFeedbackModal, showWarningModal, onTriggerOpenModal, sendFeedbackAboutPlatform, userInfo} =
      viewModel.current

    const [curNavbar, setCurNavbar] = useState(navbarConfig())
    const [shortNavbar, setShortNavbar] = useState(() => {
      const saved = localStorage.getItem('shortNavbar')
      const initialValue = JSON.parse(saved)
      return initialValue || false
    })
    useEffect(() => {
      setCurNavbar(navbarConfig())
    }, [SettingsModel.languageTag])

    useEffect(() => {
      localStorage.setItem('shortNavbar', JSON.stringify(shortNavbar))
    }, [shortNavbar])

    const drawerContent = (
      <div className={cx(classNames.mainSubWrapper, {[classNames.reverseMainSubWrapper]: shortNavbar})}>
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
        {!shortNavbar ? (
          <List className={classNames.categoriesWrapper}>
            {curNavbar[UserRoleCodeMap[viewModel.current.userInfo.role]]
              .filter(el => !el.route?.includes('/messages'))
              .map((category, index) =>
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
                        (category.route?.includes('/client/orders') &&
                          viewModel.current.userInfo.purchaseOrderRequired?.length &&
                          viewModel.current.userInfo.purchaseOrderRequired.length)
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

        <div className={classNames.bottomCategories}>
          {curNavbar[UserRoleCodeMap[viewModel.current.userInfo.role]]
            .filter(el => el.route?.includes('/messages'))
            .map((category, index) =>
              category.checkHideBlock(viewModel.current.userInfo) ? (
                <React.Fragment key={index}>
                  <NavbarCategory
                    button
                    shortNavbar={shortNavbar}
                    isSelected={category.key === activeCategory}
                    userInfo={viewModel.current.userInfo}
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
            <div className={classNames.feedBackButton} onClick={() => onTriggerOpenModal('showFeedbackModal')}>
              {!shortNavbar && (
                <Typography className={classNames.feedBackText}>{t(TranslationKey.Feedback)}</Typography>
              )}
              <Feedback className={classNames.feedbackIcon} />
            </div>
          ) : null}

          <Typography className={cx(classNames.appVersion, {[classNames.smallAppVersion]: shortNavbar})}>
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
      </div>
    )
    return (
      <div className={classNames.mainWrapper}>
        <Hidden mdDown>
          <Drawer
            open
            classes={{
              root: cx(classNames.root, {[classNames.hideNavbar]: shortNavbar}),
              paper: cx(classNames.paper, classNames.positionStatic),
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
          className={cx(classNames.hideAndShowIconWrapper, {[classNames.hideAndShowIcon]: shortNavbar})}
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
