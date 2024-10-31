import { memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { FileIcon } from '@components/shared/svg-icons'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './feedback-modal.style'

export const FeedBackModal = memo(({ onSubmit, onClose, openModal }) => {
  const { classes: styles, cx } = useStyles()
  const [comment, setComment] = useState('')
  const [images, setImages] = useState([])
  const [showFiles, setShowFiles] = useState(false)
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false)

  const handleClickCloseButton = () => {
    onClose()
    setComment('')
    setIsShowConfirmationModal(false)
  }

  const handleClickSendButton = () => {
    onSubmit(comment, images)
  }

  const disabledSubmitButton = !comment

  return (
    <Modal openModal={openModal} setOpenModal={() => setIsShowConfirmationModal(true)}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey['Any suggestions?'])}</p>

        <div className={styles.comments}>
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

        {showFiles ? <UploadFilesInput images={images} setImages={setImages} /> : null}

        <div className={styles.buttons}>
          <CustomButton disabled={disabledSubmitButton} onClick={handleClickSendButton}>
            {t(TranslationKey.Send)}
          </CustomButton>
          <CustomButton onClick={() => setIsShowConfirmationModal(true)}>{t(TranslationKey.Close)}</CustomButton>
        </div>

        {isShowConfirmationModal ? (
          <ConfirmationModal
            // @ts-ignore
            isWarning
            openModal={isShowConfirmationModal}
            setOpenModal={() => setIsShowConfirmationModal(prevState => !prevState)}
            title={t(TranslationKey.Attention)}
            successBtnText={t(TranslationKey.Yes)}
            message={t(TranslationKey['Are you sure you want to close this window?'])}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={handleClickCloseButton}
            onClickCancelBtn={() => setIsShowConfirmationModal(false)}
          />
        ) : null}
      </div>
    </Modal>
  )
})
