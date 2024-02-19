import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './supplier-payment-form.style'

export const SupplierPaymentForm = ({
  onClickSaveButton,
  onCloseModal,
  uploadedFiles,
  editPaymentDetailsPhotos,
  setEditPaymentDetailsPhotos,
}) => {
  const { classes: styles, cx } = useStyles()

  const [files, setFiles] = useState(uploadedFiles || [])

  return (
    <div className={styles.modalWrapper}>
      <p className={styles.modalTitle}>{t(TranslationKey['Add payment to supplier'])}</p>

      <UploadFilesInput
        fullWidth
        images={files}
        setImages={setFiles}
        maxNumber={50 - editPaymentDetailsPhotos?.length}
      />

      {editPaymentDetailsPhotos.length ? (
        <PhotoAndFilesSlider
          smallSlider
          showPreviews
          isEditable
          withoutMakeMainImage
          files={editPaymentDetailsPhotos}
          onChangeImagesForLoad={setEditPaymentDetailsPhotos}
        />
      ) : null}

      <diiv className={styles.saveBox}>
        <Button
          type={ButtonType.SUCCESS}
          className={styles.actionButton}
          onClick={() => {
            onClickSaveButton(files, editPaymentDetailsPhotos)
            onCloseModal()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button
          className={cx(styles.actionButton, styles.cancelButton)}
          variant={ButtonVariant.OUTLINED}
          onClick={onCloseModal}
        >
          {t(TranslationKey.Close)}
        </Button>
      </diiv>
    </div>
  )
}
