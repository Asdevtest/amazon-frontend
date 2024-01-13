import { Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './get-files-form.style'

export const GetFilesForm = ({ receivedFiles, onClose }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <Typography className={styles.modalText}>{t(TranslationKey['Received files'])}</Typography>

      <Link href={receivedFiles} download="file.xlsx" target="_blank">
        {t(TranslationKey.download)}
      </Link>

      <Button onClick={onClose}>{t(TranslationKey.Ok)}</Button>
    </div>
  )
}
