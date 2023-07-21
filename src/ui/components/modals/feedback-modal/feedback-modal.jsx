import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { FileIcon } from '@components/shared/svg-icons'
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
          labelClasses={classNames.commentLabelText}
          label={t(TranslationKey['Tell us how we can improve our platform'])}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <FileIcon
          className={cx(classNames.fileIcon, { [classNames.fileIconActive]: showFiles })}
          onClick={() => setShowFiles(!showFiles)}
        />
      </div>
      {showFiles ? <UploadFilesInput fullWidth images={images} setImages={setImages} maxNumber={50} /> : null}

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
