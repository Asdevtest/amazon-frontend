import React, {FC} from 'react'

import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {StyleClass} from '../../../../typings/class-name-types'
import {styles} from './success-button.style'

interface Props {
  className: string
  classes: StyleClass
  children: string
  onClick: () => void
}

const SuccessButtonRaw: FC<Props> = ({classes: classNames, className, ...restProps}) => (
  <Button {...restProps} className={clsx(classNames.button, className)} />
)

export const SuccessButton = withStyles(styles)(SuccessButtonRaw)
