import React from 'react'

import {Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './entry-left-panel.style'

const textConsts = getLocalizedTexts(texts, 'en').entryLeftPanel

export const EntryLeftPanel = () => {
  const classNames = useClassNames()
  return (
    <div className={classNames.leftPanel}>
      <div className={classNames.header}>
        <img className={classNames.logo} alt="company logo" src={'/assets/icons/logo-var-2.svg'} />
      </div>
      <div className={classNames.main}>
        <Typography className={classNames.title}>{textConsts.greetingTitle}</Typography>
        <Typography className={classNames.subtitle}>{textConsts.greetingSubtitle}</Typography>
      </div>
      <div className={classNames.footer}></div>
    </div>
  )
}
