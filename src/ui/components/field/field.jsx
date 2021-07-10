import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {Input} from '@components/input'

import {useClassNames} from './field.style'

export const Field = observer(
  ({label, containerClasses, containerProps, inputComponent, error, oneLine, ...restProps}) => {
    const classNames = useClassNames()
    return (
      <div className={clsx(classNames.root, containerClasses, {[classNames.rootOneLine]: oneLine})} {...containerProps}>
        <Typography className={clsx(classNames.label, {[classNames.labelOneLine]: oneLine})}>{label}</Typography>
        {inputComponent || (
          <Input className={clsx(classNames.input, {[classNames.errorActive]: error})} {...restProps} />
        )}
        {error && <Typography className={classNames.errorText}>{error}</Typography>}
      </div>
    )
  },
)
