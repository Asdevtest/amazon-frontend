import { useState } from 'react'

import { Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './add-suppliers-modal.style'

import Template from './template.xlsx'

export const AddSuppliersModal = ({ userInfo, onSubmit, onClose, showProgress, progressValue }) => {
  const { classes: styles, cx } = useStyles()

  const [images, setImages] = useState('')

  return (
    <div className={styles.root}>
      <Typography className={styles.modalTitle}>{t(TranslationKey['Adding a list of suppliers'])}</Typography>
      <div className={styles.linkWrapper}>
        <Typography>{t(TranslationKey['For easier completion'])}</Typography>
        <Link href={Template} download="application/xlsx">
          {t(TranslationKey['download the list template'])}
        </Link>
      </div>
      <div className={styles.idWrapper}>
        <Typography>{`${t(TranslationKey['Your ID'])}:`}</Typography>
        <div className={styles.copyWrapper}>
          <Typography>{userInfo._id}</Typography>
          <CopyValue text={userInfo._id} />
        </div>
      </div>

      <UploadFilesInput images={images} setImages={setImages} maxNumber={1} />

      <div className={styles.buttonsWrapper}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={!images}
          className={styles.button}
          onClick={() => onSubmit(images[0].file)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant={ButtonVariant.OUTLINED} className={cx(styles.button, styles.cancelButton)} onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
      {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
    </div>
  )
}
