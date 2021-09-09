import React from 'react'

import clsx from 'clsx'

import {useClassNames} from './button.style'
import {StyledButton} from './styled-button'

interface Props {
  variant?: string
  color?: string
  success?: boolean
  danger?: boolean
  className: string
  disabled?: boolean
  onClick?: () => void
  disableElevation?: boolean
}

export const Button = ({variant, color, children, success, danger, className, disabled, ...restProps}: Props) => {
  const classNames = useClassNames()
  return (
    <StyledButton
      disableElevation
      color={color || 'primary'}
      disabled={disabled && !(success || danger)}
      variant={variant || 'contained'}
      {...restProps}
      className={clsx(className, {
        [classNames.success]: success,
        [classNames.danger]: danger,
        [classNames.disabled]: disabled,
      })}
    >
      {children}
    </StyledButton>
  )
}
