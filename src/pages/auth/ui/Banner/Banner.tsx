import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { LogoIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import classes from './Banner.module.scss'

export const Banner: FC = memo(() => (
  <div className={classes.leftPanel}>
    <LogoIcon className={classes.logo} />

    <div className={classes.main}>
      <p className={classes.title}>{t(TranslationKey['Hello, nice to meet you'])}</p>
      <p className={classes.subtitle}>{t(TranslationKey['Just register to join with us'])}</p>
    </div>
  </div>
))
