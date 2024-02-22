import isEqual from 'lodash.isequal'
import { ChangeEvent, FC, memo, useState } from 'react'

import { MAX_DEFAULT_COMMENT_LEGTH } from '@constants/requests/request'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
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
  maxCommentLength?: number
}

export const CommentsModal: FC<CommentsModalProps> = memo(props => {
  const {
    readOnly = true,
    title,
    text,
    isOpenModal,
    maxCommentLength = MAX_DEFAULT_COMMENT_LEGTH,
    onOpenModal,
    onChangeField,
  } = props

  const { classes: styles, cx } = useStyles()

  const [comment, setComment] = useState(text || '')

  const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => setComment(event?.target.value)

  const isNotValidCommentLength = comment.length > maxCommentLength
  const hasCommentChanged = isEqual(comment, text) || isNotValidCommentLength

  const handleSaveComment = () => {
    if (!hasCommentChanged) {
      onChangeField(comment)

      onOpenModal()
    }
  }

  return (
    <Modal openModal={isOpenModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <Field
          multiline
          disabled={readOnly}
          error={isNotValidCommentLength}
          containerClasses={styles.editorContainer}
          inputClasses={cx(styles.editor, { [styles.editorReadOnly]: readOnly })}
          inputProps={{ maxLength: maxCommentLength }}
          minRows={8}
          maxRows={8}
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
