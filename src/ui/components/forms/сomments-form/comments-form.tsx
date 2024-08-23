import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { useStyles } from './comments-form.style'

interface CommentsFormProps {
  onCloseModal: () => void
  comments?: string[]
}

export const CommentsForm: FC<CommentsFormProps> = memo(({ comments, onCloseModal }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Comments on order'])}</p>

      <div className={styles.сomments}>
        {comments?.length ? (
          comments.map((comment, index) => (
            <p key={index} className={styles.text}>
              {comment}
            </p>
          ))
        ) : (
          <p className={styles.text}>{t(TranslationKey.Missing)}</p>
        )}
      </div>

      <div className={styles.buttons}>
        <Button onClick={onCloseModal}>{t(TranslationKey.Ok)}</Button>
      </div>
    </div>
  )
})
