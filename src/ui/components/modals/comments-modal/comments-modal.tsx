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
  openModal: boolean
  onOpenModal: () => void
  onChangeField: (text: string) => void
  readOnly?: boolean
  title?: string
  maxLength?: number
  required?: boolean
}

export const CommentsModal: FC<CommentsModalProps> = memo(props => {
  const {
    readOnly,
    title,
    text,
    openModal,
    required,
    maxLength = MAX_DEFAULT_COMMENT_LEGTH,
    onOpenModal,
    onChangeField,
  } = props

  const { classes: styles, cx } = useStyles()

  if (!openModal) {
    return null
  }

  const [comment, setComment] = useState('')

  useEffect(() => {
    setComment(text)
  }, [text, openModal])

  const isNotValidCommentLength = comment?.length > maxLength
  const requiredText = required && !comment
  const hasCommentChanged = isEqual(comment, text) || isNotValidCommentLength || requiredText

  const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => setComment(event.target.value)
  const handleSaveComment = () => {
    if (!hasCommentChanged) {
      onChangeField(comment)
      setComment('')
      onOpenModal()
    }
  }
  const handleToggleModal = () => {
    setComment('')
    onOpenModal()
  }

  return (
    <Modal openModal={openModal} setOpenModal={handleToggleModal}>
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
