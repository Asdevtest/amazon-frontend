import { nanoid } from 'nanoid'
import React, { FC } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useClassNames } from './comments-form.style'

interface CommentsFormProps {
  comments?: Array<string>
  onCloseModal: () => void
}

export const CommentsForm: FC<CommentsFormProps> = props => {
  const { classes: classNames } = useClassNames()

  const { comments, onCloseModal } = props

  return (
    <div className={classNames.root}>
      <div className={classNames.сommentsTitleWrapper}>
        <Typography className={classNames.сommentsTitle}>{t(TranslationKey['Comments on order'])}</Typography>
      </div>
      <div className={classNames.сommentsTextWrapper}>
        {comments?.length ? (
          comments.map(comment => (
            <Typography key={nanoid()} className={classNames.сommentsText}>
              {comment}
            </Typography>
          ))
        ) : (
          <Typography className={classNames.сommentsText}>{t(TranslationKey.Missing)}</Typography>
        )}
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button className={classNames.okButton} onClick={onCloseModal}>
          {t(TranslationKey.Ok)}
        </Button>
      </div>
    </div>
  )
}
