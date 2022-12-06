import {Box, Container, Typography, Link} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value'
import {Field} from '@components/field/field'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './set-barcode-modal.style'

export const SetBarcodeModal = ({onClickSaveBarcode, onCloseModal, tmpCode, item, title}) => {
  const {classes: classNames} = useClassNames()

  const barCode = item?.barCode || ''

  const [files, setFiles] = useState(tmpCode?.length ? [...tmpCode] : [])

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{title ? title : t(TranslationKey['Add barcode'])}</Typography>

      {barCode && (
        <Field
          label={t(TranslationKey.BarCode)}
          inputComponent={
            <div className={classNames.barCodeWrapper}>
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(barCode)}>
                <Typography className={classNames.link}>{t(TranslationKey.View)}</Typography>
              </Link>
              <CopyValue text={barCode} />
            </div>
          }
        />
      )}

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput images={files} setImages={setFiles} maxNumber={1} />
      </div>

      <Box className={classNames.saveBox}>
        <Button
          success
          disabled={!files.length}
          className={classNames.saveBtn}
          onClick={() => onClickSaveBarcode([files[0]])}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={classNames.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </Box>
    </Container>
  )
}
