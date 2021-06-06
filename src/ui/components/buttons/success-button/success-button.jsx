import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {styles} from './success-button.style'

const SuccessButtonRaw = ({classes: classNames, ...restProps}) => (
  <Button {...restProps} className={classNames.button} />
)

export const SuccessButton = withStyles(styles)(SuccessButtonRaw)
