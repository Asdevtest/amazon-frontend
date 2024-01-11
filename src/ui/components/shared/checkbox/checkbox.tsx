import { FC, PropsWithChildren, memo } from 'react'

import { CheckboxProps } from '@material-ui/core'
import { Checkbox as MaterialCheckbox } from '@mui/material'

import { useStyles } from './checkbox.style'

interface CustomCheckboxProps extends PropsWithChildren, CheckboxProps {
  reverted?: boolean
}

export const Checkbox: FC<CustomCheckboxProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { reverted, color, title = '', children, ...restProps } = props

  return (
    <div className={cx(styles.root, { [styles.reverted]: reverted })}>
      <MaterialCheckbox title={title ?? ''} color={color || 'primary'} {...restProps} />
      {children}
    </div>
  )
})
