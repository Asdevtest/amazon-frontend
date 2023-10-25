import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { FC, useState } from 'react'

import { List, Typography } from '@mui/material'

import { appVersion } from '@constants/app-version'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { navBarActiveCategory } from '@constants/navigation/navbar-active-category'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserInfoSchema } from '@services/rest-api-service/codegen'

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

import { NavbarConfigTypes } from '@typings/navbar-config'
import { IUser } from '@typings/user'

import { useClassNames } from './navbar-drawer-content.styles'

import { getCategoryBadge } from './navbar-drawer-content.helper'

interface Props {
  shortNavbar: boolean
  onToggleModal: VoidFunction
  confirmModalSettings: NavbarModel['confirmModalSettings']
  alertShieldSettings: NavbarModel['alertShieldSettings']
  curNavbar: NavbarConfigTypes.RootObject
  userInfo: UserInfoSchema
  activeCategory: string
  viewModel: NavbarModel
  onClickVersion: NavbarModel['onClickVersion']
  onTriggerOpenModal: (arg: string) => void
  activeSubCategory: string
  sendFeedbackAboutPlatform: NavbarModel['sendFeedbackAboutPlatform']
  showFeedbackModal: boolean
  showWarningModal: boolean
  showConfirmModal: boolean
}

const alwaysShowSubCategoryKeys = [navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS]

export const NavbarDrawerContent: FC<Props> = observer(
  ({
    shortNavbar,
    onToggleModal,
    confirmModalSettings,
    alertShieldSettings,
    curNavbar,
    userInfo,
    activeCategory,
    viewModel,
    onTriggerOpenModal,
    onClickVersion,
    activeSubCategory,
    sendFeedbackAboutPlatform,
    showFeedbackModal,
    showWarningModal,
    showConfirmModal,
  }) => {
    const { classes: classNames } = useClassNames()
    const [filteredCategories] = useState(() =>
      curNavbar[UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap] as keyof typeof curNavbar].filter(
        el => !el.route?.includes('/messages'),
      ),
    )
    const [filteredBottomCategories] = useState(() =>
      curNavbar[UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap] as keyof typeof curNavbar].filter(el =>
        el.route?.includes('/messages'),
      ),
    )

    return (
      <div className={classNames.mainSubWrapper}>
        <List className={classNames.categoriesWrapper}>
          {filteredCategories.map((category, index) =>
            category.checkHideBlock(userInfo) ? (
              <React.Fragment key={index}>
                <NavbarCategory
                  classes=""
                  isSelected={category.key === activeCategory}
                  shortNavbar={shortNavbar}
                  userInfo={userInfo}
                  category={category}
                  badge={getCategoryBadge(category, userInfo as unknown as IUser)}
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
                    currentViewModel={viewModel}
                  />
                )}
              </React.Fragment>
            ) : null,
          )}
        </List>

        <div className={classNames.bottomCategories}>
          {filteredBottomCategories.map((category, index) =>
            category.checkHideBlock(userInfo) ? (
              <React.Fragment key={index}>
                <NavbarCategory
                  classes=""
                  shortNavbar={shortNavbar}
                  isSelected={category.key === activeCategory}
                  userInfo={userInfo}
                  category={category}
                  badge={category.route?.includes('/messages') && viewModel.unreadMessages}
                  onToggleModal={onToggleModal}
                />
              </React.Fragment>
            ) : null,
          )}

          {!checkIsAdmin(UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap]) ? (
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

        <FeedBackModal
          openModal={showFeedbackModal}
          setOpenModal={() => onTriggerOpenModal('showFeedbackModal')}
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
  },
)
