import React from 'react'

import clsx from 'clsx'

import {useClassNames} from './button.style'
import {StyledButton} from './styled-button'

export const Button = ({variant, color, children, success, danger, className, disabled, ...restProps}) => {
  const classNames = useClassNames()
  return (
    <StyledButton
      color={color || 'primary'}
      disableElevation
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
