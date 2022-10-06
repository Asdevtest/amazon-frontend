import {Typography} from '@mui/material'

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {useClassNames} from './entry-left-panel.style'

export const EntryLeftPanel = () => {
  const {classes: classNames} = useClassNames()

  // const classNames = classes

  // console.log('classes', classes)

  return (
    <div className={classNames.leftPanel}>
      <div className={classNames.header}>
        <img className={classNames.logo} alt="company logo" src={'/assets/icons/big-logo.svg'} />
      </div>
      <div className={classNames.main}>
        <Typography className={classNames.title}>{t(TranslationKey['Hello, nice to meet you'])}</Typography>
        <Typography className={classNames.subtitle}>{t(TranslationKey['Just register to join with us'])}</Typography>
      </div>
      <div className={classNames.footer}></div>
    </div>
  )
}
