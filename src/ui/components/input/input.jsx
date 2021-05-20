import {InputBase} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {styles} from './input.style'

const InputRaw = props => <InputBase {...props} />

export const Input = withStyles(styles)(InputRaw)
