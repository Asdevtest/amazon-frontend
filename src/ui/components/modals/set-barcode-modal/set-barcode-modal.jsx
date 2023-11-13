import { memo, useState } from 'react'

import { Link } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './set-barcode-modal.style'

export const SetBarcodeModal = memo(props => {
  const { onClickSaveBarcode, onCloseModal, tmpCode, item, title, maxNumber } = props
  const { classes: classNames } = useStyles()

  const [files, setFiles] = useState(tmpCode?.length ? [...tmpCode] : [])

  const barCode = item?.barCode || ''

  return (
    <div className={classNames.modalWrapper}>
      <p className={classNames.modalTitle}>{title ? title : t(TranslationKey['Add barcode'])}</p>

      {barCode && (
        <Field
          label={t(TranslationKey.BarCode)}
          inputComponent={
            <div className={classNames.barCodeWrapper}>
              <Link target="_blank" rel="noreferrer" href={checkAndMakeAbsoluteUrl(barCode)}>
                <p className={classNames.link}>{t(TranslationKey.View)}</p>
              </Link>
              <CopyValue text={item?.barCode || ''} />
            </div>
          }
        />
      )}

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput images={files} setImages={setFiles} maxNumber={maxNumber || 1} />
      </div>

      <div className={classNames.saveBox}>
        <Button
          success
          disabled={!files.length && !tmpCode?.length}
          className={classNames.saveBtn}
          onClick={() => onClickSaveBarcode(files)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={classNames.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
