import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {StyleClass} from '../../../../typings/class-name-types'
import {styles} from './error-button.style'

interface Props {
  classes: StyleClass
  children: string
  onClick: () => void
  className: string
}

const ErrorButtonRaw = ({classes: classNames, ...restProps}: Props) => (
  <Button {...restProps} className={clsx(classNames.button, restProps.className)} />
)

export const ErrorButton = withStyles(styles)(ErrorButtonRaw)
