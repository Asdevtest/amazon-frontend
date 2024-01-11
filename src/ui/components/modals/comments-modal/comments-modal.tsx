import { ChangeEvent, FC, memo } from 'react'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Modal } from '@components/shared/modal'

import { useStyles } from './comments-modal.style'

interface CommentsModalProps {
  readOnly: boolean
  title: string
  text: string
  isOpenModal: boolean
  onOpenModal: () => void
  onChangeField: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CommentsModal: FC<CommentsModalProps> = memo(props => {
  const { readOnly = true, title, text, isOpenModal, onOpenModal, onChangeField } = props

  const { classes: styles } = useStyles()

  return (
    <Modal openModal={isOpenModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{title}</p>

        <CustomTextEditor
          readOnly={readOnly}
          conditions={text}
          editorMaxHeight={styles.editorWrapper}
          changeConditions={onChangeField}
        />
      </div>
    </Modal>
  )
})
