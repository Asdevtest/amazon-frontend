/* eslint-disable no-unused-vars */
import {Box, Container, Link, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {
  PhotoCarousel,
  PhotoAndFilesCarousel,
  PhotoAndFilesCarouselMini,
} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'
import {UploadFilesInput} from '@components/upload-files-input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {checkAndMakeAbsoluteUrl, getShortenStringIfLongerThanCount} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './supplier-payment-form.style'

export const SupplierPaymentForm = ({
  item,
  onClickSaveButton,
  onCloseModal,
  uploadedFiles,
  editPaymentDetailsPhotos,
}) => {
  const {classes: classNames} = useClassNames()

  console.log('editPaymentDetailsPhotos', editPaymentDetailsPhotos)

  const [files, setFiles] = useState(uploadedFiles || [])

  const [editPhotos, setEditPhotos] = useState(editPaymentDetailsPhotos)

  const updateImagesForLoad = images => {
    if (!Array.isArray(images)) {
      return
    }
    setEditPhotos([...editPaymentDetailsPhotos, ...images.map(el => getAmazonImageUrl(el, true))])
  }

  const onChangeDetailsPhotosToLoad = value => {
    setEditPhotos(value)
  }

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Add payment to supplier'])}</Typography>

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput images={files} setImages={setFiles} maxNumber={50 - item?.paymentDetails.length} />
      </div>
      {!!item?.paymentDetails.length && (
        <PhotoAndFilesCarousel
          isEditable
          small
          width="400px"
          files={item?.paymentDetails}
          imagesForLoad={editPhotos}
          onChangeImagesForLoad={onChangeDetailsPhotosToLoad}
        />
      )}

      <Box className={classNames.saveBox}>
        <Button
          // disabled={!files.length}
          className={classNames.actionButton}
          onClick={() => {
            onClickSaveButton(files, editPhotos)
            onCloseModal()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button className={classNames.actionButton} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </Box>
    </Container>
  )
}
