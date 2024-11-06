import { FC, MouseEvent, PropsWithChildren, memo, useState } from 'react'
import { MdClose } from 'react-icons/md'

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
  unsetHidden?: boolean
}

export const Modal: FC<ModalProps> = memo(props => {
  const { openModal, setOpenModal, missClickModalOn, children, isSecondBackground, unsetHidden = false } = props

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
          <MdClose className={styles.closeIcon} size={30} onClick={handleCloseModal} />

          <div className={cx(styles.content, { [styles.unsetHidden]: unsetHidden })}>{children}</div>
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
