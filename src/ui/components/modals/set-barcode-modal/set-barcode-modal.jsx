import React, {useState} from 'react'

import {Box, Container, Divider, Typography, Link} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {UploadFilesInput} from '@components/upload-files-input'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './set-barcode-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalSetBarcode

export const SetBarcodeModal = ({onClickSaveBarcode, onCloseModal, tmpCode, item}) => {
  const classNames = useClassNames()

  const barCode = item?.barCode || ''

  const [files, setFiles] = useState(tmpCode?.length ? [...tmpCode] : [])

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Add barcode'])}</Typography>

      <Divider className={classNames.divider} />

      {barCode && (
        <Box className={classNames.boxCode}>
          <Typography className={clsx(classNames.modalText, classNames.typoCode)}>{textConsts.code}</Typography>

          <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(barCode)}>
            <Typography className={classNames.link}>{barCode}</Typography>
          </Link>
        </Box>
      )}

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput images={files} setImages={setFiles} maxNumber={1} />
      </div>

      <Divider className={classNames.divider} />

      <Box className={classNames.saveBox}>
        <Button disabled={!files.length} className={classNames.saveBtn} onClick={() => onClickSaveBarcode([files[0]])}>
          {t(TranslationKey.Save)}
        </Button>
        <Button onClick={onCloseModal}>{t(TranslationKey.Close)}</Button>
      </Box>
    </Container>
  )
}
