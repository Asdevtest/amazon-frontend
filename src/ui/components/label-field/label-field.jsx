import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {useClassNames} from './label-field.style'

export const LabelField = observer(({label, containerClasses, containerProps, value}) => {
  const classNames = useClassNames()
  return (
    <div className={clsx(classNames.root, containerClasses)} {...containerProps}>
      <Typography className={classNames.label}>{label}</Typography>
      <Typography className={classNames.field}>{value}</Typography>
    </div>
  )
})
