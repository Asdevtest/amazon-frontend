import React from 'react'

import {Divider, Typography} from '@material-ui/core'

import {useClassNames} from './entry-right-panel.style.js'

export const EntryRightPanel = ({handleRedirectClick, redirect, title, children}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.rightPanel}>
      <div className={classNames.formWrapper}>
        <div className={classNames.formHeader}>
          <Typography className={classNames.title}>{title}</Typography>
          <Typography onClick={handleRedirectClick}>{redirect}</Typography>
        </div>
        <Divider className={classNames.divider} />
        {children}
      </div>
    </div>
  )
}
