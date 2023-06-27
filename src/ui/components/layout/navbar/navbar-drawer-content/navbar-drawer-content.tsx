import React from 'react'
import { cx } from '@emotion/css'
import { SettingsModel } from '@models/settings-model'
import { UiTheme } from '@constants/theme/themes'
import { List, Typography } from '@mui/material'
import { NavbarButton } from '@components/layout/navbar/navbar-button'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { NavbarCategory } from '@components/layout/navbar'
import { NavbarCollapse } from '@components/layout/navbar/navbar-collapse'
import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'
import { TranslationKey } from '@constants/translations/translation-key'
import { Feedback } from '@components/shared/svg-icons'
import { appVersion } from '@constants/app-version'
import { Modal } from '@components/shared/modal'
import { FeedBackModal } from '@components/modals/feedback-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { useNavbarDrawerContentStyles } from '@components/layout/navbar/navbar-drawer-content/navbar-drawer-content.styles'
import { NavbarModel } from '@components/layout/navbar/navbar.model'
import { observer } from 'mobx-react'

interface CurNavbarType {
  icon: React.ReactNode
  title: string
  route: string
  subtitles: null | {
    subtitle: string
    subRoute: string
    key: string
  }
  key: string
  checkHideBlock: (user: unknown) => boolean
}

interface NavbarDrawerContentProps {
  shortNavbar: boolean
  setShortNavbar: (arg: boolean) => void
  setShowOverlayNavBar: (arg: boolean) => void
  showOverlayNavBar: boolean
  confirmModalSettings: NavbarModel['confirmModalSettings']
  curNavbar: Record<keyof typeof UserRole, CurNavbarType[]>
  userInfo: any
  activeCategory: string
  viewModel: NavbarModel
  onChangeSubCategory?: () => void
  onClickVersion: NavbarModel['onClickVersion']
  onTriggerOpenModal: (arg: string) => void
  activeSubCategory: string
  sendFeedbackAboutPlatform: NavbarModel['sendFeedbackAboutPlatform']
  showFeedbackModal: boolean
  showWarningModal: boolean
  showConfirmModal: boolean
}

export const NavbarDrawerContent = observer((props: NavbarDrawerContentProps) => {
  const { classes: styles } = useNavbarDrawerContentStyles()

  const {
    shortNavbar,
    setShortNavbar,
    showOverlayNavBar,
    setShowOverlayNavBar,
    confirmModalSettings,
    curNavbar,
    userInfo,
    activeCategory,
    viewModel,
    onTriggerOpenModal,
    onChangeSubCategory,
    onClickVersion,
    activeSubCategory,
    sendFeedbackAboutPlatform,
    showFeedbackModal,
    showWarningModal,
    showConfirmModal,
  } = props

  return (
    <div className={cx(styles.mainSubWrapper, { [styles.reverseMainSubWrapper]: shortNavbar })}>
      {!shortNavbar ? (
        <div className={styles.logoWrapper}>
          <img
            alt="company logo"
            className={styles.logo}
            src={
              SettingsModel.uiTheme === UiTheme.light
                ? '/assets/icons/logo-01.08.svg'
                : '/assets/icons/dt-navbar-logo.svg'
            }
          />
        </div>
      ) : null}
      {/* {!shortNavbar ? ( */}
      <List className={styles.categoriesWrapper}>
        {window.innerWidth < 1282 && (
          <NavbarButton
            shortNavbar={shortNavbar}
            setShortNavbar={setShortNavbar}
            setShowOverlayNavBar={setShowOverlayNavBar}
            showOverlayNavBar={showOverlayNavBar}
          />
        )}
        {curNavbar[UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap] as keyof typeof curNavbar]
          .filter(el => !el.route?.includes('/messages'))
          .map((category, index) =>
            category.checkHideBlock(userInfo) ? (
              <React.Fragment key={index}>
                <NavbarCategory
                  classes=""
                  isSelected={category.key === activeCategory}
                  shortNavbar={shortNavbar}
                  userInfo={userInfo}
                  category={category}
                  badge={
                    (category.route?.includes('/client/notifications') &&
                      userInfo.needConfirmPriceChange?.boxes +
                        userInfo.needConfirmPriceChange?.orders +
                        userInfo.needUpdateTariff?.boxes +
                        userInfo.updatesOnIdeas +
                        userInfo.freelanceNotices.length) ||
                    (category.route?.includes('/buyer/notifications') && userInfo.updatesOnIdeas) ||
                    (category.route?.includes('/client/my-orders/orders') && userInfo.allOrders) ||
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
                  currentViewModel={viewModel}
                  onChangeSubCategory={onChangeSubCategory}
                />
              </React.Fragment>
            ) : null,
          )}
      </List>
      {/* ) : null} */}

      <div className={styles.bottomCategories}>
        {curNavbar[UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap] as keyof typeof curNavbar]
          .filter(el => el.route?.includes('/messages'))
          .map((category, index) =>
            category.checkHideBlock(userInfo) ? (
              <React.Fragment key={index}>
                <NavbarCategory
                  classes=""
                  shortNavbar={shortNavbar}
                  isSelected={category.key === activeCategory}
                  userInfo={userInfo}
                  category={category}
                  badge={category.route?.includes('/messages') && viewModel.unreadMessages}
                />
              </React.Fragment>
            ) : null,
          )}

        {/* {!checkIsAdmin(UserRoleCodeMap[userInfo.role]) && !shortNavbar ? (
            <div className={styles.feedBackButton} onClick={() => onTriggerOpenModal('showFeedbackModal')}>
              <Typography className={styles.feedBackText}>{t(TranslationKey.Feedback)}</Typography>
              <Feedback className={styles.feedbackIcon} />
            </div>
          ) : null} */}

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

      {/* <Typography className={styles.appVersion}>{appVersion}</Typography>

        {!checkIsAdmin(UserRoleCodeMap[userInfo.role]) && !shortNavbar ? (
          <div className={styles.feedBackButton} onClick={() => onTriggerOpenModal('showFeedbackModal')}>
            <Typography className={styles.feedBackText}>{t(TranslationKey.Feedback)}</Typography>
            <Feedback className={styles.feedbackIcon} />
          </div>
        ) : null} */}

      <Modal
        openModal={showFeedbackModal}
        setOpenModal={() => onTriggerOpenModal('showFeedbackModal')}
        isWarning={false}
        missClickModalOn={false}
        dialogContextClassName=""
      >
        <FeedBackModal onSubmit={sendFeedbackAboutPlatform} onClose={() => onTriggerOpenModal('showFeedbackModal')} />
      </Modal>

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
})
