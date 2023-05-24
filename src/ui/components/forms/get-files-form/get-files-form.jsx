import { Link, Typography } from '@mui/material'

import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useClassNames } from './get-files-form.style'

export const GetFilesForm = ({ receivedFiles, onClose }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      <Typography className={classNames.modalText}>{t(TranslationKey['Received files'])}</Typography>

      <Link href={receivedFiles} download="file.xlsx" target="_blank">
        {t(TranslationKey.download)}
      </Link>

      <Button onClick={onClose}>{t(TranslationKey.Ok)}</Button>
    </div>
  )
}
