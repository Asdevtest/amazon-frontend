import {InputBase} from '@mui/material'

// import TextField from '@mui/material/TextField'
import {withStyles} from 'tss-react/mui'

import {styles, stylesWithIcon} from './input.style'

// const InputRaw = props => <TextField inputProps={props.inputProps ? props.inputProps : {maxLength: 1000}} {...props} />

const InputRaw = props => <InputBase inputProps={props.inputProps ? props.inputProps : {maxLength: 1000}} {...props} />

export const Input = withStyles(InputRaw, styles)
export const InputWithIcon = withStyles(InputRaw, stylesWithIcon)
