/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useStyles } from './set-files-modal.style'

interface SetTransparencyProps {
  tmpFiles: string[]
  currentFiles: string
  onCloseModal: (condition: boolean) => void
  onClickSave: (files: string[]) => void
  modalTitle?: string
  LabelTitle?: string
  maxNumberOfiles?: number
}

export const SetFilesModal: FC<SetTransparencyProps> = memo(props => {
  const { onClickSave, onCloseModal, tmpFiles, currentFiles, modalTitle, LabelTitle, maxNumberOfiles } = props
  const { classes: styles } = useStyles()

  const [files, setFiles] = useState(tmpFiles?.length ? tmpFiles : [])

  return (
    <div className={styles.modalWrapper}>
      <p className={styles.modalTitle}>{modalTitle ? modalTitle : t(TranslationKey['Add barcode'])}</p>

      {currentFiles && (
        <LabelWithCopy
          direction="column"
          labelTitleSize="medium"
          lableLinkTitleSize="medium"
          labelTitle={LabelTitle || t(TranslationKey.BarCode)}
          labelValue={currentFiles}
          lableLinkTitle={t(TranslationKey.View)}
        />
      )}

      <UploadFilesInput images={files} setImages={setFiles} maxNumber={maxNumberOfiles || 1} />

      <div className={styles.saveBox}>
        <Button
          success
          disabled={!files.length && !tmpFiles?.length}
          className={styles.saveBtn}
          onClick={() => onClickSave(files)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={styles.closeBtn} onClick={() => onCloseModal(false)}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
