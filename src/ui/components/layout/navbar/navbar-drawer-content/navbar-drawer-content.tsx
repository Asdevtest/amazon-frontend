/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, Fragment, memo, useEffect, useState } from 'react'

import { List, Typography } from '@mui/material'

import { appVersion } from '@constants/app-version'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { navBarActiveCategory } from '@constants/navigation/navbar-active-category'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { NavbarCategory } from '@components/layout/navbar'
import { NavbarCollapse } from '@components/layout/navbar/navbar-collapse'
import { NavbarModel } from '@components/layout/navbar/navbar.model'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { FeedBackModal } from '@components/modals/feedback-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AlertShield } from '@components/shared/alert-shield'
import { Feedback } from '@components/shared/svg-icons'

import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'

import { IInfoCounters } from '@typings/shared/info-counters'
import { NavbarConfigTypes } from '@typings/shared/navbar-config'

import { useStyles } from './navbar-drawer-content.style'

import { getCategoryBadge } from './navbar-drawer-content.helper'

interface NavbarDrawerContentProps {
  shortNavbar: boolean
  onToggleModal: () => void
  confirmModalSettings: NavbarModel['confirmModalSettings']
  alertShieldSettings: NavbarModel['alertShieldSettings']
  curNavbar: NavbarConfigTypes.RootObject
  userInfo: IInfoCounters
  activeCategory: string
  unreadMessages: ChatMessageContract[]
  onClickVersion: NavbarModel['onClickVersion']
  onTriggerOpenModal: (arg: string) => void
  activeSubCategory: string
  sendFeedbackAboutPlatform: NavbarModel['sendFeedbackAboutPlatform']
  showFeedbackModal: boolean
  showWarningModal: boolean
  showConfirmModal: boolean
}

export const alwaysShowSubCategoryKeys = [
  navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
  navBarActiveCategory.NAVBAR_READY_TO_CHECK,
]

export const NavbarDrawerContent: FC<NavbarDrawerContentProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    shortNavbar,
    confirmModalSettings,
    alertShieldSettings,
    curNavbar,
    userInfo,
    activeCategory,
    unreadMessages,
    activeSubCategory,
    showFeedbackModal,
    showWarningModal,
    showConfirmModal,
    onToggleModal,
    onTriggerOpenModal,
    onClickVersion,
    sendFeedbackAboutPlatform,
  } = props

  const [filteredCategories, setFilteredCategories] = useState<NavbarConfigTypes.Route[]>([])
  const [filteredBottomCategories, setFilteredBottomCategories] = useState<NavbarConfigTypes.Route[]>([])

  const getFilteredCategories = () =>
    curNavbar[UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap] as keyof typeof curNavbar].filter(
      el => !el.route?.includes('/messages'),
    )

  const getFilteredBottomCategories = () =>
    curNavbar[UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap] as keyof typeof curNavbar].filter(el =>
      el.route?.includes('/messages'),
    )

  useEffect(() => {
    setFilteredCategories(getFilteredCategories())
    setFilteredBottomCategories(getFilteredBottomCategories())
  }, [])

  useEffect(() => {
    if (!userInfo.role) return
    setFilteredCategories(getFilteredCategories())
    setFilteredBottomCategories(getFilteredBottomCategories())
  }, [userInfo.role])

  return (
    <div className={styles.mainSubWrapper}>
      <List className={styles.categoriesWrapper}>
        {filteredCategories.map((category: NavbarConfigTypes.Route, index: number) =>
          category.checkHideBlock(userInfo) ? (
            <Fragment key={index}>
              <NavbarCategory
                // @ts-ignore
                classes=""
                isSelected={category.key === activeCategory}
                shortNavbar={shortNavbar}
                userInfo={userInfo}
                category={category}
                badge={getCategoryBadge(category, userInfo) || 0}
                onToggleModal={onToggleModal}
              />

              {(category.key === activeCategory || alwaysShowSubCategoryKeys.includes(category.key)) && (
                <NavbarCollapse
                  showHighPriorityNotification
                  shortNavbar={shortNavbar}
                  activeCategory={activeCategory}
                  activeSubCategory={activeSubCategory}
                  category={category}
                  index={category.key}
                  userInfo={userInfo}
                />
              )}
            </Fragment>
          ) : null,
        )}
      </List>

      <div className={styles.bottomCategories}>
        {filteredBottomCategories.map((category: NavbarConfigTypes.Route, index: number) =>
          category.checkHideBlock(userInfo) ? (
            <Fragment key={index}>
              <NavbarCategory
                // @ts-ignore
                classes=""
                shortNavbar={shortNavbar}
                isSelected={category.key === activeCategory}
                userInfo={userInfo}
                category={category}
                badge={category.route?.includes('/messages') && unreadMessages}
                onToggleModal={onToggleModal}
              />
            </Fragment>
          ) : null,
        )}

        {!checkIsAdmin(UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap]) ? (
          <div
            className={cx(styles.feedBackButton, { [styles.shortFeedBackButton]: shortNavbar })}
            onClick={() => onTriggerOpenModal('showFeedbackModal')}
          >
            {!shortNavbar && <Typography className={styles.feedBackText}>{t(TranslationKey.Feedback)}</Typography>}
            <Feedback className={styles.feedbackIcon} />
          </div>
        ) : null}

        <Typography
          className={cx(styles.appVersion, { [styles.smallAppVersion]: shortNavbar })}
          onClick={onClickVersion}
        >
          {appVersion}
        </Typography>
      </div>

      <FeedBackModal
        openModal={showFeedbackModal}
        onSubmit={sendFeedbackAboutPlatform}
        onClose={() => onTriggerOpenModal('showFeedbackModal')}
      />

      <WarningInfoModal
        isWarning={false}
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
        isWarning={confirmModalSettings?.isWarning}
        title={confirmModalSettings.confirmTitle}
        message={confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />

      {alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={alertShieldSettings.showAlertShield}
          acceptMessage={alertShieldSettings.alertShieldMessage}
        />
      )}
    </div>
  )
})
