import { cx } from '@emotion/css'
import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { FileIcon } from '@components/shared/svg-icons'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './feedback-modal.style'

export const FeedBackModal = ({ onSubmit, onClose, openModal, setOpenModal }) => {
  const { classes: classNames } = useClassNames()

  const [comment, setComment] = useState('')
  const [images, setImages] = useState([])
  const [showFiles, setShowFiles] = useState(false)
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false)

  const onClickCloseButton = () => {
    onClose()
    setComment('')
  }

  const onClickSendButton = () => {
    onSubmit(comment, images)
  }

  const disabledSubmitButton = !comment

  return (
    <Modal openModal={openModal} setOpenModal={() => setIsShowConfirmationModal(true)}>
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
          <Button variant="text" className={classNames.buttonCancel} onClick={() => setIsShowConfirmationModal(true)}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>

        <ConfirmationModal
          isWarning
          openModal={isShowConfirmationModal}
          setOpenModal={() => setIsShowConfirmationModal(prevState => !prevState)}
          title={t(TranslationKey.Attention)}
          successBtnText={t(TranslationKey.Yes)}
          message={t(TranslationKey['Are you sure you want to close this window?'])}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            onClickCloseButton()
            setIsShowConfirmationModal(false)
          }}
          onClickCancelBtn={() => setIsShowConfirmationModal(false)}
        />
      </div>
    </Modal>
  )
}
