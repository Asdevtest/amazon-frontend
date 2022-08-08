import React, {useState} from 'react'

import {Container, Link, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {UploadFilesInput} from '@components/upload-files-input'

import {t} from '@utils/translations'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {Button} from '@components/buttons/button'
// import {Field} from '@components/field'
// import {checkIsPositiveNum} from '@utils/checks'
// import {t} from '@utils/translations'
import {useClassNames} from './add-suppliers-modal.style'
import Template from './template.xlsx'

export const AddSuppliersModal = ({product, onSubmit, onClose}) => {
  const classNames = useClassNames()

  const [images, setImages] = useState('')
  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }
  console.log(product)
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
          <Typography>{product.originalData.client._id}</Typography>
          <img
            className={classNames.copyImg}
            src="/assets/icons/copy-img.svg"
            alt=""
            onClick={() => copyValue(product.originalData.client._id)}
          />
        </div>
      </div>

      <UploadFilesInput images={images} setImages={setImages} maxNumber={1} acceptType={['xlsx']} />
      <div className={classNames.buttonsWrapper}>
        <Button success className={classNames.button} onClick={() => onSubmit(images[0])}>
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={clsx(classNames.button, classNames.cancelButton)} onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </Container>
  )
}
