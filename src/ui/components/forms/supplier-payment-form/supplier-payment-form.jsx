import { memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

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
        <Button
          fullWidth
          styleType={ButtonStyle.SUCCESS}
          onClick={() => {
            setEditPaymentDetailsPhotos(files)
            onCloseModal()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button fullWidth variant={ButtonVariant.OUTLINED} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </diiv>
    </div>
  )
})
