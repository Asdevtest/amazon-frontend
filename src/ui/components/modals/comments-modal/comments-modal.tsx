import isEqual from 'lodash.isequal'
import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { MAX_DEFAULT_COMMENT_LEGTH } from '@constants/requests/request'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './comments-modal.style'

interface CommentsModalProps {
  text: string
  isOpenModal: boolean
  onOpenModal: () => void
  onChangeField: (text: string) => void
  isTextRequired?: boolean
  readOnly?: boolean
  title?: string
  maxLength?: number
}

export const CommentsModal: FC<CommentsModalProps> = memo(props => {
  const {
    readOnly,
    title,
    text,
    isOpenModal,
    isTextRequired,
    maxLength = MAX_DEFAULT_COMMENT_LEGTH,
    onOpenModal,
    onChangeField,
  } = props

  const { classes: styles, cx } = useStyles()

  const [comment, setComment] = useState('')

  useEffect(() => {
    if (text.length > 0) {
      setComment(text)
    }
  }, [text])

  const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => setComment(event?.target.value)

  const isNotValidCommentLength = comment.length > maxLength
  const requiredText = isTextRequired && !comment
  const hasCommentChanged = isEqual(comment, text) || isNotValidCommentLength || requiredText

  const handleSaveComment = () => {
    if (!hasCommentChanged) {
      onChangeField(comment)

      onOpenModal()

      setComment('')
    }
  }

  const handleCloseModal = () => {
    onOpenModal()
    setComment('')
  }

  return (
    <Modal openModal={isOpenModal} setOpenModal={handleCloseModal}>
      <div className={styles.wrapper}>
        <Field
          multiline
          minRows={8}
          maxRows={8}
          disabled={readOnly}
          error={isNotValidCommentLength}
          containerClasses={styles.editorContainer}
          inputClasses={cx(styles.editor, { [styles.editorReadOnly]: readOnly })}
          inputProps={{ maxLength }}
          labelClasses={styles.title}
          label={title}
          value={comment}
          onChange={handleChangeComment}
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
