import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {styles} from './error-button.style'

const ErrorButtonRaw = ({classes: classNames, ...restProps}) => (
  <Button {...restProps} className={clsx(classNames.button, restProps.className)} />
)

export const ErrorButton = withStyles(styles)(ErrorButtonRaw)
