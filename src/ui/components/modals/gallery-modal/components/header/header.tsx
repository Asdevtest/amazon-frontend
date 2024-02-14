import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AllFilesIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './header.style'

interface HeaderProps {
  title?: string
}

export const Header: FC<HeaderProps> = memo(({ title }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.header}>
      <div className={styles.iconWrapper}>
        <AllFilesIcon className={styles.icon} />
      </div>

      <p className={styles.title}>{t(TranslationKey['All files'])}</p>

      {title ? <p className={styles.title}>{title}</p> : null}
    </div>
  )
})
