import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { LogoIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './auth-page-banner.style'

export const AuthPageBanner = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.leftPanel}>
      <LogoIcon className={styles.logo} />

      <div className={styles.main}>
        <p className={styles.title}>{t(TranslationKey['Hello, nice to meet you'])}</p>
        <p className={styles.subtitle}>{t(TranslationKey['Just register to join with us'])}</p>
      </div>

      <div className={styles.footer} />
    </div>
  )
})
