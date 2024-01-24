/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

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
  const { onClickSaveBarcode, onCloseModal, tmpCode, barCode = '', title = '', maxNumber = 1 } = props

  const { classes: styles, cx } = useStyles()

  const [files, setFiles] = useState<string[]>(tmpCode?.length ? tmpCode : [])

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

      <UploadFilesInput images={files} setImages={setFiles} maxNumber={maxNumber} />

      <div className={styles.buttons}>
        <Button
          success
          disabled={!files.length && !tmpCode?.length}
          className={styles.button}
          onClick={() => {
            onClickSaveBarcode(files)
            onCloseModal()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>

        <Button variant="text" className={cx(styles.button, styles.closeButton)} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
