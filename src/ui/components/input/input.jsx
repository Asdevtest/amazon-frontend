import {InputBase} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {styles, stylesWithIcon} from './input.style'

const InputRaw = props => <InputBase inputProps={props.inputProps ? props.inputProps : {maxLength: 1000}} {...props} />

export const Input = withStyles(styles)(InputRaw)
export const InputWithIcon = withStyles(stylesWithIcon)(InputRaw)
