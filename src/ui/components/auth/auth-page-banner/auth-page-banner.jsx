import { Typography } from '@mui/material'

import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { t } from '@utils/translations'

import { useClassNames } from './auth-page-banner.style'

export const AuthPageBanner = () => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.leftPanel}>
      <div className={classNames.header}>
        <img
          className={classNames.logo}
          alt="company logo"
          src={
            SettingsModel.uiTheme === UiTheme.light
              ? '/assets/icons/big-logo.svg'
              : '/assets/icons/dark-theme-big-logo.svg'
          }
        />
      </div>
      <div className={classNames.main}>
        <Typography className={classNames.title}>{t(TranslationKey['Hello, nice to meet you'])}</Typography>
        <Typography className={classNames.subtitle}>{t(TranslationKey['Just register to join with us'])}</Typography>
      </div>
      <div className={classNames.footer}></div>
    </div>
  )
}
