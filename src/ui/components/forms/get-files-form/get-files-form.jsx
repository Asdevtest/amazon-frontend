import {Link, Typography} from '@mui/material'

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './get-files-form.style'

export const GetFilesForm = ({receivedFiles, onClose}) => {
  const {classes: classNames} = useClassNames()

  console.log('receivedFiles', receivedFiles)

  return (
    <div className={classNames.root}>
      <Typography className={classNames.modalText}>{t(TranslationKey['Add files'])}</Typography>

      <Link href={receivedFiles.data} download="application/xlsx">
        {t(TranslationKey['download the list template'])}
      </Link>

      <Button onClick={onClose}>{t(TranslationKey.Ok)}</Button>
    </div>
  )
}
