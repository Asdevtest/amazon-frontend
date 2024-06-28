import { observer } from 'mobx-react'
import { useState } from 'react'
import { NavbarDrawerContent } from 'src/widgets/layout/navbar/navbar-drawer-content'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { navbarConfig } from '@constants/navigation/navbar'
import { TranslationKey } from '@constants/translations/translation-key'

import { VersionHistoryForm } from '@components/forms/version-history-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { FeedBackModal } from '@components/modals/feedback-modal'
import { DrawerModal } from '@components/shared/drawer-modal'
import { Modal } from '@components/shared/modal'
import { LogoIcon, ShortLogoIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './navbar.style'

import { NavbarModel } from './navbar.model'

export const Navbar = observer(props => {
  const { shortNavbar, activeCategory, activeSubCategory, isOpenModal, onShowNavbar, onToggleModal } = props

  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(new NavbarModel())
  const [curNavbar] = useState(navbarConfig)

  return (
    <>
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
            curNavbar={curNavbar}
            userInfo={viewModel.userInfo}
            activeCategory={activeCategory}
            unreadMessages={viewModel.unreadMessages}
            activeSubCategory={activeSubCategory}
            sendFeedbackAboutPlatform={viewModel.sendFeedbackAboutPlatform}
            showFeedbackModal={viewModel.showFeedbackModal}
            onTriggerOpenModal={viewModel.onTriggerOpenModal}
            onClickVersion={viewModel.onClickVersion}
            onToggleModal={onToggleModal}
          />
        </DrawerModal>
      </div>

      {viewModel.showFeedbackModal ? (
        <FeedBackModal
          // @ts-ignore
          openModal={viewModel.showFeedbackModal}
          onSubmit={viewModel.sendFeedbackAboutPlatform}
          onClose={() => viewModel.onTriggerOpenModal('showFeedbackModal')}
        />
      ) : null}

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          isWarning={viewModel.confirmModalSettings.isWarning}
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal
        openModal={viewModel.showVersionHistoryModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showVersionHistoryModal')}
      >
        <VersionHistoryForm
          title={t(TranslationKey['Version history of releases'])}
          selectedPatchNote={viewModel.patchNote}
          patchNotes={viewModel.patchNotes}
          onScrollPatchNotes={viewModel.loadMoreDataHadler}
          onResetPatchNote={viewModel.onResetPatchNote}
          onViewPatchNote={viewModel.getPatchNote}
          onClickResetVersion={viewModel.onClickResetVersion}
        />
      </Modal>
    </>
  )
})
