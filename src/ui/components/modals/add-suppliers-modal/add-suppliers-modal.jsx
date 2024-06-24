import { memo, useState } from 'react'

import { Link } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { isString } from '@typings/guards'

import { useStyles } from './add-suppliers-modal.style'

import Template from './template.xlsx'

export const AddSuppliersModal = memo(props => {
  const { userInfo, onSubmit, onClose, showProgress, progressValue } = props

  const { classes: styles } = useStyles()
  const [images, setImages] = useState([])

  const handleSubmit = () => {
    const file = isString(images[0]) ? images[0] : images[0].file
    onSubmit(file)
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Adding a list of suppliers'])}</p>

      <div className={styles.flexContainer}>
        <p>{t(TranslationKey['For easier completion'])}</p>
        <Link href={Template} download="application/xlsx">
          {t(TranslationKey['download the list template'])}
        </Link>
      </div>

      <div className={styles.flexContainer}>
        <p>{`${t(TranslationKey['Your ID'])}:`}</p>
        <div className={styles.flexContainer}>
          <p>{userInfo._id}</p>
          <CopyValue text={userInfo._id} />
        </div>
      </div>

      <UploadFilesInput images={images} setImages={setImages} maxNumber={1} />

      <div className={styles.buttons}>
        <Button disabled={images.length === 0} styleType={ButtonStyle.SUCCESS} onClick={handleSubmit}>
          {t(TranslationKey.Save)}
        </Button>
        <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
          {t(TranslationKey.Close)}
        </Button>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
    </div>
  )
})
