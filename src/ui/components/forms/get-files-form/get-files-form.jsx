import { Link } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './get-files-form.style'

export const GetFilesForm = ({ receivedFiles, onClose }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <p className={styles.modalText}>{t(TranslationKey['Received files'])}</p>

      <Link href={checkAndMakeAbsoluteUrl(receivedFiles)} download="file.xlsx" target="_blank">
        {t(TranslationKey.download)}
      </Link>

      <Button onClick={onClose}>{t(TranslationKey.Ok)}</Button>
    </div>
  )
}
