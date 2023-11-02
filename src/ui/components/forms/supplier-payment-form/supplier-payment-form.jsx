/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React, { useState } from 'react'

import { Box, Container, Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './supplier-payment-form.style'

export const SupplierPaymentForm = ({
  item,
  onClickSaveButton,
  onCloseModal,
  uploadedFiles,
  editPaymentDetailsPhotos,
}) => {
  const { classes: classNames } = useClassNames()

  const [files, setFiles] = useState(uploadedFiles || [])

  const [editPhotos, setEditPhotos] = useState(editPaymentDetailsPhotos || [])

  const onChangeDetailsPhotosToLoad = value => {
    setEditPhotos(value)
  }

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Add payment to supplier'])}</Typography>

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput fullWidth images={files} setImages={setFiles} maxNumber={50 - item?.paymentDetails.length} />
      </div>
      {!!item?.paymentDetails.length && (
        <PhotoAndFilesCarousel
          isEditable
          withoutMakeMainImage
          small
          width="400px"
          files={item?.paymentDetails}
          imagesForLoad={editPhotos}
          onChangeImagesForLoad={onChangeDetailsPhotosToLoad}
        />
      )}

      <Box className={classNames.saveBox}>
        <Button
          success
          className={classNames.actionButton}
          onClick={() => {
            onClickSaveButton(files, editPhotos)
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
      </Box>
    </Container>
  )
}
