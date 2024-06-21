import { FC, MouseEvent, PropsWithChildren, memo, useState } from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'

import { t } from '@utils/translations'

import { useStyles } from './modal.style'

import { ModalPortal } from './modal-portal'

interface ModalProps extends PropsWithChildren {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  missClickModalOn?: boolean
  isSecondBackground?: boolean
}

export const Modal: FC<ModalProps> = memo(props => {
  const { openModal, setOpenModal, missClickModalOn, children, isSecondBackground } = props

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
  const handleCloseModal = () => {
    setOpenModal(false)
    setShowMissClickModal(false)
  }

  return (
    <ModalPortal>
      <div
        className={cx(styles.dialogWrapper, { [styles.openModal]: openModal })}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className={cx(styles.contentWrapper, { [styles.alternativeBackground]: isSecondBackground })}>
          <CloseRoundedIcon className={styles.closeIcon} fontSize="large" onClick={handleCloseModal} />

          <div className={styles.content}>{children}</div>
        </div>
      </div>

      {showMissClickModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={showMissClickModal}
          setOpenModal={() => setShowMissClickModal(!showMissClickModal)}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Window will be closed'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => setOpenModal(false)}
          onClickCancelBtn={() => setShowMissClickModal(!showMissClickModal)}
        />
      ) : null}
    </ModalPortal>
  )
})
