import { nanoid } from 'nanoid'
import { FC, memo } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './comments-form.style'

interface CommentsFormProps {
  onCloseModal: () => void
  comments?: string[]
}

export const CommentsForm: FC<CommentsFormProps> = memo(({ comments, onCloseModal }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.сommentsTitleWrapper}>
        <Typography className={styles.сommentsTitle}>{t(TranslationKey['Comments on order'])}</Typography>
      </div>
      <div className={styles.сommentsTextWrapper}>
        {comments?.length ? (
          comments.map(comment => (
            <Typography key={nanoid()} className={styles.сommentsText}>
              {comment}
            </Typography>
          ))
        ) : (
          <Typography className={styles.сommentsText}>{t(TranslationKey.Missing)}</Typography>
        )}
      </div>

      <div className={styles.buttonsWrapper}>
        <Button className={styles.okButton} onClick={onCloseModal}>
          {t(TranslationKey.Ok)}
        </Button>
      </div>
    </div>
  )
})
