/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './set-files-modal.style'

interface SetTransparencyProps {
  tmpFiles: UploadFileType[]
  currentFiles: string
  onCloseModal: (condition: boolean) => void
  onClickSave: (files: UploadFileType[]) => void
  modalTitle?: string
  LabelTitle?: string
  maxNumberOfiles?: number
}

export const SetFilesModal: FC<SetTransparencyProps> = memo(props => {
  const { onClickSave, onCloseModal, tmpFiles, currentFiles, modalTitle, LabelTitle, maxNumberOfiles } = props

  const { classes: styles } = useStyles()
  const [files, setFiles] = useState<UploadFileType[]>([])

  useEffect(() => {
    if (tmpFiles?.length > 0) {
      setFiles(tmpFiles)
    }
  }, [tmpFiles])

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{modalTitle ? modalTitle : t(TranslationKey['Add barcode'])}</p>

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

      <div className={styles.buttons}>
        <CustomButton type="primary" disabled={!files.length && !tmpFiles?.length} onClick={() => onClickSave(files)}>
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton onClick={() => onCloseModal(false)}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
