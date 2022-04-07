import React, {FC} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {Input} from '@components/input'

import {StyleClass} from '../../../typings/class-name-types'
import {useClassNames} from './field.style'

interface Props {
  label: string
  containerClasses?: StyleClass
  labelClasses?: StyleClass
  inputClasses?: StyleClass
  inputComponent?: React.ComponentType
  error?: string
  oneLine?: boolean
}

export const Field: FC<Props> = observer(
  ({label, labelClasses, containerClasses, inputClasses, inputComponent, error, oneLine, ...restProps}) => {
    const classNames = useClassNames()
    return (
      <div className={clsx(classNames.root, containerClasses, {[classNames.rootOneLine]: oneLine})}>
        <Typography className={clsx(classNames.label, labelClasses, {[classNames.labelOneLine]: oneLine})}>
          {label}
        </Typography>
        {inputComponent || (
          <Input className={clsx(classNames.input, inputClasses, {[classNames.errorActive]: error})} {...restProps} />
        )}
        {error && <Typography className={classNames.errorText}>{error}</Typography>}
      </div>
    )
  },
)
