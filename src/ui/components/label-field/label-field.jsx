import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React from 'react'

import {observer} from 'mobx-react'

import {useClassNames} from './label-field.style'

export const LabelField = observer(({label, containerClasses, containerProps, value}) => {
  const {classes: classNames} = useClassNames()
  return (
    <div className={cx(classNames.root, containerClasses)} {...containerProps}>
      <Typography className={classNames.label}>{label}</Typography>
      <Typography className={classNames.field}>{value}</Typography>
    </div>
  )
})
