import isEqual from 'lodash.isequal'
import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './set-barcode-modal.style'

interface SetBarcodeModalProps {
  tmpCode: string[]
  onClickSaveBarcode: (files: string[]) => void
  onCloseModal: () => void
  barCode?: string
  title?: string
  maxNumber?: number
}

export const SetBarcodeModal: FC<SetBarcodeModalProps> = memo(props => {
  const { tmpCode, onClickSaveBarcode, onCloseModal, barCode = '', title = '', maxNumber = 1 } = props

  const { classes: styles } = useStyles()
  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    if (tmpCode?.length > 0) {
      setFiles(tmpCode)
    }
  }, [tmpCode])

  const disableSaveButton = isEqual(files, tmpCode)

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title ? title : t(TranslationKey['Add barcode'])}</p>

      {barCode && (
        <LabelWithCopy
          direction="column"
          labelTitleSize="medium"
          lableLinkTitleSize="medium"
          labelTitle={t(TranslationKey.BarCode)}
          labelValue={barCode}
          lableLinkTitle={t(TranslationKey.View)}
        />
      )}

      <UploadFilesInput images={files} setImages={setFiles} maxNumber={maxNumber} />

      <div className={styles.buttons}>
        <CustomButton
          type="primary"
          disabled={disableSaveButton}
          onClick={() => {
            onClickSaveBarcode(files)
            onCloseModal()
          }}
        >
          {t(TranslationKey.Save)}
        </CustomButton>

        <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
