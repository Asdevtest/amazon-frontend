import React from 'react'

import {Typography} from '@material-ui/core'

import {textsEn} from '@constants/texts'

import {useClassNames} from './entry-left-panel.style'

const textConsts = textsEn.entryLeftPanel

export const EntryLeftPanel = () => {
  const classNames = useClassNames()
  return (
    <div className={classNames.leftPanel}>
      <div className={classNames.header}>
        <Typography>{textConsts.companyName}</Typography>
      </div>
      <div className={classNames.main}>
        <Typography className={classNames.title}>{textConsts.greetingTitle}</Typography>
        <Typography className={classNames.subtitle}>{textConsts.greetingSubtitle}</Typography>
      </div>
      <div className={classNames.footer}>
        <Typography>{textConsts.footer}</Typography>
      </div>
    </div>
  )
}
