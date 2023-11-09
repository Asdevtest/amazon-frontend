import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './supplier-payment-form.style'

export const SupplierPaymentForm = ({
  onClickSaveButton,
  onCloseModal,
  uploadedFiles,
  editPaymentDetailsPhotos,
  setEditPaymentDetailsPhotos,
}) => {
  const { classes: classNames, cx } = useClassNames()

  const [files, setFiles] = useState(uploadedFiles || [])

  return (
    <div className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Add payment to supplier'])}</Typography>

      <div className={classNames.uploadWrapper}>
        <UploadFilesInput
          fullWidth
          images={files}
          setImages={setFiles}
          maxNumber={50 - editPaymentDetailsPhotos?.length}
        />
      </div>

      <PhotoAndFilesSlider
        smallSlider
        showPreviews
        isEditable
        withoutMakeMainImage
        files={editPaymentDetailsPhotos}
        onChangeImagesForLoad={setEditPaymentDetailsPhotos}
      />

      <div className={classNames.saveBox}>
        <Button
          success
          className={classNames.actionButton}
          onClick={() => {
            onClickSaveButton(files, editPaymentDetailsPhotos)
            onCloseModal()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button
          className={cx(classNames.actionButton, classNames.cancelButton)}
          variant={'text'}
          onClick={onCloseModal}
        >
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
