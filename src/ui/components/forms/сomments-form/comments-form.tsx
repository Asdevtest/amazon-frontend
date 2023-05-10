import {Typography} from '@mui/material'

import React, {FC} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './comments-form.style'

interface CommentsFormProps {
  comment?: string
  onCloseModal: () => void
}

export const CommentsForm: FC<CommentsFormProps> = props => {
  const {classes: classNames} = useClassNames()

  const {comment, onCloseModal} = props

  return (
    <div className={classNames.root}>
      <div className={classNames.сommentsTitleWrapper}>
        <Typography className={classNames.сommentsTitle}>{t(TranslationKey['Comments on order'])}</Typography>
      </div>
      <div className={classNames.сommentsTextWrapper}>
        <Typography className={classNames.сommentsText}>{comment ? comment : t(TranslationKey.Missing)}</Typography>
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button className={classNames.okButton} onClick={onCloseModal}>
          {t(TranslationKey.Ok)}
        </Button>
      </div>
    </div>
  )
}
