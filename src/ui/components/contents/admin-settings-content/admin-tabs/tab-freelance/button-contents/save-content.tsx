import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SaveIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from '../tab-freelance.style'

export const SaveContent: FC = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.buttonContent}>
      <SaveIcon className={styles.saveIcon} />
      <span className={styles.saveText}>{t(TranslationKey.Save)}</span>
    </div>
  )
})
