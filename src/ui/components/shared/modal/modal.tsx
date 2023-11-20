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

  const [showMissClickModal, setShowMissClickModal] = useState(false)
  const [mousedownTarget, setMousedownTarget] = useState<EventTarget | null>(null)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setMousedownTarget(e.target)
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (mousedownTarget === e.target && e.target === e.currentTarget) {
      missClickModalOn ? setShowMissClickModal(!showMissClickModal) : setOpenModal(false)
    }

    setMousedownTarget(null)
  }

  return (
    <ModalPortal>
      <div
        className={cx(styles.dialogWrapper, { [styles.openModal]: openModal }, dialogClassName)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className={cx(styles.contentWrapper, contentWrapperClassName)}>
          <CloseRoundedIcon className={styles.closeIcon} fontSize="large" onClick={() => setOpenModal(false)} />

          <div className={cx(styles.content, contentClassName)}>{children}</div>
        </div>
      </div>

      <ConfirmationModal
        openModal={showMissClickModal}
        setOpenModal={() => setShowMissClickModal(!showMissClickModal)}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Window will be closed'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => setOpenModal(false)}
        onClickCancelBtn={() => setShowMissClickModal(!showMissClickModal)}
      />
    </ModalPortal>
  )
})
