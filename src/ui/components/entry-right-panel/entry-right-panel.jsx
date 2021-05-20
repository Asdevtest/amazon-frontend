import React, {useCallback} from 'react'

import {Divider, Typography} from '@material-ui/core'
import {useHistory} from 'react-router'

import {useClassNames} from './entry-right-panel.style.js'

export const EntryRightPanel = ({route, redirect, title, children}) => {
  const classNames = useClassNames()
  const history = useHistory()

  const redirectOnClick = useCallback(() => {
    history.push(route)
  }, [route])

  return (
    <div className={classNames.rightPanel}>
      <div className={classNames.formWrapper}>
        <div className={classNames.formHeader}>
          <Typography className={classNames.title}>{title}</Typography>
          <Typography onClick={redirectOnClick}>{redirect}</Typography>
        </div>
        <Divider className={classNames.divider} />
        {children}
      </div>
    </div>
  )
}
