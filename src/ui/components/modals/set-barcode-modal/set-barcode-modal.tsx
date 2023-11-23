/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useStyles } from './set-barcode-modal.style'

interface SetBarcodeModalProps {
  onClickSaveBarcode: (files: string[]) => void
  onCloseModal: () => void
  tmpCode: string[]
  item: any
  title?: string
  maxNumber?: number
}

export const SetBarcodeModal: FC<SetBarcodeModalProps> = memo(props => {
  const { onClickSaveBarcode, onCloseModal, tmpCode, item, title, maxNumber } = props
  const { classes: styles } = useStyles()

  const [files, setFiles] = useState(tmpCode?.length ? tmpCode : [])

  const barCode = item?.barCode || ''

  return (
    <div className={styles.modalWrapper}>
      <p className={styles.modalTitle}>{title ? title : t(TranslationKey['Add barcode'])}</p>

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

      <UploadFilesInput images={files} setImages={setFiles} maxNumber={maxNumber || 1} />

      <div className={styles.saveBox}>
        <Button
          success
          disabled={!files.length && !tmpCode?.length}
          className={styles.saveBtn}
          onClick={() => onClickSaveBarcode(files)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={styles.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
