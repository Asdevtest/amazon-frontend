import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {StyleClass} from '../../../../typings/class-name-types'
import {styles} from './success-button.style'

interface Props {
  classes: StyleClass
  children: string
  onClick: () => void
}

const SuccessButtonRaw = ({classes: classNames, ...restProps}: Props) => (
  <Button {...restProps} className={classNames.button} />
)

export const SuccessButton = withStyles(styles)(SuccessButtonRaw)
