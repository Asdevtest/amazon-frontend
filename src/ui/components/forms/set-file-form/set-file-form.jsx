import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { isString } from '@typings/guards'

import { useStyles } from './set-file-form.style'

export const SetFileForm = props => {
  const { onSubmit, onClose, data, maxNumber = 1 } = props

  const { classes: styles } = useStyles()
  const [files, setFiles] = useState([])

  const isButtonDisabled = files.length === 0

  useEffect(() => {
    if (data) {
      setFiles(isString(data) ? [data] : data)
    }
  }, [data])

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Set Shipping Label'])}</p>

      <UploadFilesInput images={files} setImages={setFiles} maxNumber={maxNumber} />

      <div className={styles.buttons}>
        <CustomButton size="large" type="primary" disabled={isButtonDisabled} onClick={() => onSubmit(files)}>
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton size="large" onClick={onClose}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
}
