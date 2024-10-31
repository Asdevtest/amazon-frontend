import { memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './supplier-payment-form.style'

export const SupplierPaymentForm = memo(props => {
  const { onCloseModal, editPaymentDetailsPhotos, setEditPaymentDetailsPhotos } = props

  const { classes: styles } = useStyles()

  const [files, setFiles] = useState([])

  useEffect(() => {
    if (editPaymentDetailsPhotos.length > 0) {
      setFiles(editPaymentDetailsPhotos)
    }
  }, [editPaymentDetailsPhotos])

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Add payment to supplier'])}</p>

      <UploadFilesInput images={files} setImages={setFiles} />

      <diiv className={styles.buttons}>
        <CustomButton
          fullWidth
          type="primary"
          onClick={() => {
            setEditPaymentDetailsPhotos(files)
            onCloseModal()
          }}
        >
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton fullWidth onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </diiv>
    </div>
  )
})
