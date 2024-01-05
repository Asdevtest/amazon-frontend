import { FC, memo } from 'react'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Modal } from '@components/shared/modal'

import { useStyles } from './comments-modal.style'

interface CommentsModalProps {
  isOpenModal: boolean
  onOpenModal: () => void
  title?: string
  text?: string
}

export const CommentsModal: FC<CommentsModalProps> = memo(props => {
  const { title, text, isOpenModal, onOpenModal } = props

  const { classes: styles } = useStyles()

  return (
    <Modal openModal={isOpenModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{title}</p>

        <CustomTextEditor readOnly conditions={text} editorMaxHeight={styles.editorWrapper} />
      </div>
    </Modal>
  )
})
