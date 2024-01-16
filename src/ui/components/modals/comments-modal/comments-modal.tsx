import isEqual from 'lodash.isequal'
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './comments-modal.style'

interface CommentsModalProps {
  readOnly: boolean
  title: string
  text: string
  isOpenModal: boolean
  onOpenModal: () => void
  onChangeField: (text: string) => void
}

export const CommentsModal: FC<CommentsModalProps> = memo(props => {
  const { readOnly = true, title, text, isOpenModal, onOpenModal, onChangeField } = props

  const { classes: styles } = useStyles()

  const [comment, setComment] = useState(text)

  const hasCommentChanged = isEqual(comment, text)

  const handleSaveComment = () => {
    if (!hasCommentChanged) {
      onChangeField(comment)

      onOpenModal()
    }
  }

  return (
    <Modal openModal={isOpenModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{title}</p>

        <CustomTextEditor
          readOnly={readOnly}
          conditions={text}
          editorMaxHeight={styles.editorWrapper}
          changeConditions={setComment}
        />

        {!readOnly ? (
          <div className={styles.buttons}>
            <button disabled={hasCommentChanged} className={styles.buttonSave} onClick={handleSaveComment}>
              {t(TranslationKey.Save)}
            </button>
          </div>
        ) : null}
      </div>
    </Modal>
  )
})
