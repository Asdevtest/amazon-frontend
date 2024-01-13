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

import { useStyles } from './feedback-modal.style'

export const FeedBackModal = ({ onSubmit, onClose, openModal, setOpenModal }) => {
  const { classes: styles, cx } = useStyles()

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
      <div className={styles.modalMessageWrapper}>
        <Typography variant="h5" className={styles.modalMessageTitle}>
          {t(TranslationKey['Any suggestions?'])}
        </Typography>
        <div className={styles.commentWrapper}>
          <Field
            multiline
            className={styles.heightFieldAuto}
            minRows={6}
            maxRows={6}
            inputProps={{ maxLength: 1000 }}
            labelClasses={styles.commentLabelText}
            label={t(TranslationKey['Tell us how we can improve our platform'])}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <FileIcon
            className={cx(styles.fileIcon, { [styles.fileIconActive]: showFiles })}
            onClick={() => setShowFiles(!showFiles)}
          />
        </div>
        {showFiles ? (
          <div className={styles.uploadFilesInput}>
            <UploadFilesInput fullWidth images={images} setImages={setImages} maxNumber={50} />
          </div>
        ) : null}

        <div className={styles.buttonsWrapper}>
          <Button
            color="primary"
            variant="contained"
            disabled={disabledSubmitButton}
            className={styles.buttonOk}
            onClick={onClickSendButton}
          >
            {t(TranslationKey.Send)}
          </Button>
          <Button variant="text" className={styles.buttonCancel} onClick={() => setIsShowConfirmationModal(true)}>
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
