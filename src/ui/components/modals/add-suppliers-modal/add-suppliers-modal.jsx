import { cx } from '@emotion/css'
import { useState } from 'react'

import { Container, Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './add-suppliers-modal.style'

import Template from './template.xlsx'

export const AddSuppliersModal = ({ userInfo, onSubmit, onClose, showProgress, progressValue }) => {
  const { classes: classNames } = useClassNames()

  const [images, setImages] = useState('')

  return (
    <Container disableGutters className={classNames.root}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Adding a list of suppliers'])}</Typography>
      <div className={classNames.linkWrapper}>
        <Typography>{t(TranslationKey['For easier completion'])}</Typography>
        <Link href={Template} download="application/xlsx">
          {t(TranslationKey['download the list template'])}
        </Link>
      </div>
      <div className={classNames.idWrapper}>
        <Typography>{`${t(TranslationKey['Your ID'])}:`}</Typography>
        <div className={classNames.copyWrapper}>
          <Typography>{userInfo._id}</Typography>
          <CopyValue text={userInfo._id} />
        </div>
      </div>

      <UploadFilesInput images={images} setImages={setImages} maxNumber={1} acceptType={['xlsx']} />
      <div className={classNames.buttonsWrapper}>
        <Button success disabled={!images} className={classNames.button} onClick={() => onSubmit(images[0].file)}>
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={cx(classNames.button, classNames.cancelButton)} onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
      {showProgress && (
        <CircularProgressWithLabel value={progressValue} title={`${t(TranslationKey['Loading data'])}...`} />
      )}
    </Container>
  )
}
