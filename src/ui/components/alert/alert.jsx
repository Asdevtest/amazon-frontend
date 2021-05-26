import React from 'react'

import {Collapse, Paper} from '@material-ui/core'
import clsx from 'clsx'

import {useClassNames} from './alert.style'

export const Alert = ({open = true, title, type, className, ...restProps}) => {
  const classNames = useClassNames()
  return (
    <Collapse in={open}>
      <Paper
        className={clsx(
          classNames.root,
          {
            [classNames.success]: type === 'success',
            [classNames.warning]: type === 'warning',
          },
          className,
        )}
        {...restProps}
      >
        {title}
      </Paper>
    </Collapse>
  )
}
