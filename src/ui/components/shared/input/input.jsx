import { withStyles } from 'tss-react/mui'

import { InputBase } from '@mui/material'

import { styles, stylesWithIcon } from './input.style'

const InputRaw = props => (
  <InputBase inputProps={props.inputProps ? props.inputProps : { maxLength: 1000 }} {...props} />
)

export const Input = withStyles(InputRaw, styles)
export const InputWithIcon = withStyles(InputRaw, stylesWithIcon)
