import React, {FC} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {Input} from '@components/input'

import {FieldClass} from '@typings/class-name-types'

import {useClassNames} from './field.style'

interface Props {
  label: string
  containerClasses?: FieldClass
  inputComponent?: React.ComponentType
  error?: string
  oneLine?: boolean
}

export const Field: FC<Props> = observer(({label, containerClasses, inputComponent, error, oneLine, ...restProps}) => {
  const classNames = useClassNames()
  return (
    <div className={clsx(classNames.root, containerClasses, {[classNames.rootOneLine]: oneLine})}>
      <Typography className={clsx(classNames.label, {[classNames.labelOneLine]: oneLine})}>{label}</Typography>
      {inputComponent || <Input className={clsx(classNames.input, {[classNames.errorActive]: error})} {...restProps} />}
      {error && <Typography className={classNames.errorText}>{error}</Typography>}
    </div>
  )
})
