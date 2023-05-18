import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './feedback-modal.style'

export const FeedBackModal = ({ onSubmit, onClose }) => {
  const { classes: classNames } = useClassNames()

  const [comment, setComment] = useState('')
  const [images, setImages] = useState([])
  const [showFiles, setShowFiles] = useState(false)

  const onClickCloseButton = () => {
    onClose()
    setComment('')
  }

  const onClickSendButton = () => {
    onSubmit(comment, images)
  }

  // useEffect(() => {
  //   const listener = event => {
  //     if (openModal && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
  //       event.preventDefault()
  //       onClickSubmit()
  //     }
  //   }
  //   document.addEventListener('keydown', listener)
  //   return () => {
  //     document.removeEventListener('keydown', listener)
  //   }
  // }, [])

  const disabledSubmitButton = !comment

  return (
    <div className={classNames.modalMessageWrapper}>
      <Typography variant="h5" className={classNames.modalMessageTitle}>
        {t(TranslationKey['Any suggestions?'])}
      </Typography>
      <div className={classNames.commentWrapper}>
        <Field
          multiline
          className={classNames.heightFieldAuto}
          minRows={6}
          maxRows={6}
          inputProps={{ maxLength: 1000 }}
          // placeholder={t(TranslationKey.Reason)}
          labelClasses={classNames.commentLabelText}
          label={t(TranslationKey['Tell us how we can improve our platform'])}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <img
          src={showFiles ? '/assets/icons/files-active.svg' : '/assets/icons/files.svg'}
          className={cx(classNames.inputIcon, classNames.fileIconPos)}
          onClick={() => setShowFiles(!showFiles)}
        />
      </div>
      {showFiles ? <UploadFilesInput images={images} setImages={setImages} maxNumber={50} /> : null}

      <div className={classNames.buttonsWrapper}>
        <Button
          color="primary"
          variant="contained"
          disabled={disabledSubmitButton}
          className={classNames.buttonOk}
          onClick={onClickSendButton}
        >
          {t(TranslationKey.Send)}
        </Button>
        <Button variant="text" className={classNames.buttonCancel} onClick={onClickCloseButton}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
