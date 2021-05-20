import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {Input} from '@components/input'

import {useClassNames} from './field.style'

export const Field = ({label, containerClasses, containerProps, ...others}) => {
  const classNames = useClassNames()
  return (
    <div className={clsx(classNames.root, containerClasses)} {...containerProps}>
      <Typography className={classNames.label}>{label}</Typography>
      <Input className={classNames.input} {...others} />
    </div>
  )
}
