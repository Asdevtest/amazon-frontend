/* eslint-disable no-unused-vars */
import {Box, Container, Link, Typography} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {PhotoCarousel, PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkAndMakeAbsoluteUrl, getShortenStringIfLongerThanCount} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './supplier-payment-form.style'

export const SupplierPaymentForm = ({item, onClickSaveButton, onCloseModal, uploadedFiles}) => {
  const {classes: classNames} = useClassNames()

  const [files, setFiles] = useState(uploadedFiles || [])

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Add payment to supplier'])}</Typography>

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput images={files} setImages={setFiles} maxNumber={50 - item?.paymentDetails.length} />
      </div>
      {!!item?.paymentDetails.length && <PhotoCarousel small files={item?.paymentDetails} width="400px" />}

      <Box className={classNames.saveBox}>
        <Button
          // disabled={!files.length}
          className={classNames.actionButton}
          onClick={() => {
            onClickSaveButton(files)
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
