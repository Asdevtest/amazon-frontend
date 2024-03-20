import { memo } from 'react'

import { Typography } from '@mui/material'

import { UiTheme } from '@constants/theme/mui-theme.type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { t } from '@utils/translations'

import { useStyles } from './auth-page-banner.style'

export const AuthPageBanner = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.leftPanel}>
      <div className={styles.header}>
        <img
          className={styles.logo}
          alt="company logo"
          src={
            SettingsModel.uiTheme === UiTheme.light
              ? '/assets/icons/big-logo.svg'
              : '/assets/icons/dark-theme-big-logo.svg'
          }
        />
      </div>
      <div className={styles.main}>
        <Typography className={styles.title}>{t(TranslationKey['Hello, nice to meet you'])}</Typography>
        <Typography className={styles.subtitle}>{t(TranslationKey['Just register to join with us'])}</Typography>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
})
