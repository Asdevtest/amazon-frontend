import { FC, MouseEvent, PropsWithChildren, memo, useState } from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'

import { t } from '@utils/translations'

import { useStyles } from './modal.style'

import { ModalPortal } from './modal-portal'

interface ModalProps extends PropsWithChildren {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  missClickModalOn?: boolean
  dialogClassName?: string
  contentClassName?: string
  contentWrapperClassName?: string
}

export const Modal: FC<ModalProps> = memo(props => {
  const {
    openModal,
    setOpenModal,
    missClickModalOn,
    dialogClassName,
    contentClassName,
    contentWrapperClassName,
    children,
  } = props

  if (!openModal) {
    return null
  }

  const { classes: styles, cx } = useStyles()
  const [showMissclickModal, setShowMissclickModal] = useState(false)

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      missClickModalOn ? setShowMissclickModal(!showMissclickModal) : setOpenModal(false)
    }
  }

  return (
    <ModalPortal>
      <div
        className={cx(styles.dialogWrapper, dialogClassName, openModal && styles.openModal)}
        onClick={handleModalClick}
      >
        <div className={cx(styles.contentWrapper, contentWrapperClassName)}>
          <CloseRoundedIcon className={styles.closeIcon} fontSize="large" onClick={() => setOpenModal(false)} />

          <div className={cx(styles.content, contentClassName)}>{children}</div>
        </div>
      </div>

      <ConfirmationModal
        openModal={showMissclickModal}
        setOpenModal={() => setShowMissclickModal(!showMissclickModal)}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Window will be closed'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => setOpenModal(false)}
        onClickCancelBtn={() => setShowMissclickModal(!showMissclickModal)}
      />
    </ModalPortal>
  )
})
