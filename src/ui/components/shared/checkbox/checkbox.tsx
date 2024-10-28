import { FC, PropsWithChildren } from 'react'

import { CheckboxProps } from '@material-ui/core'
import { Checkbox as MaterialCheckbox } from '@mui/material'

import { useStyles } from './checkbox.style'

interface CustomCheckboxProps extends PropsWithChildren, CheckboxProps {
  reverted?: boolean
  wrapperClassName?: string
}

export const Checkbox: FC<CustomCheckboxProps> = props => {
  const { reverted, color, title = '', children, wrapperClassName, ...restProps } = props
  const { classes: styles, cx } = useStyles()

  return (
    <div
      className={cx(styles.root, { [styles.reverted]: reverted }, wrapperClassName)}
      onClick={e => e.stopPropagation()}
    >
      <MaterialCheckbox title={title || ''} color={color || 'primary'} {...restProps} />
      {children}
    </div>
  )
}
