import { FC, PropsWithChildren } from 'react'

import { CheckboxProps } from '@material-ui/core'
import { Checkbox as MaterialCheckbox } from '@mui/material'

import { useStyles } from './checkbox.style'

interface CustomCheckboxProps extends PropsWithChildren, CheckboxProps {}

export const Checkbox: FC<CustomCheckboxProps> = ({ color, title = '', children, ...restProps }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <MaterialCheckbox title={title ?? ''} color={color || 'primary'} {...restProps} />
      {children}
    </div>
  )
}
