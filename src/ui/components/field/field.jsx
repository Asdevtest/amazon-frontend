import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {Input} from '@components/input'

import {useClassNames} from './field.style'

export const Field = observer(({label, containerClasses, containerProps, inputComponent, ...restProps}) => {
  const classNames = useClassNames()
  return (
    <div className={clsx(classNames.root, containerClasses)} {...containerProps}>
      <Typography className={classNames.label}>{label}</Typography>
      {inputComponent || <Input className={classNames.input} {...restProps} />}
    </div>
  )
})
