import React, {FC, ReactElement} from 'react'

import {Tooltip} from '@material-ui/core'
import clsx from 'clsx'

import {useClassNames} from './button.style'
import {StyledButton} from './styled-button'

interface Props {
  tooltipContent?: ReactElement | string
  variant?: string
  color?: string
  success?: boolean
  danger?: boolean
  className: string
  disabled?: boolean
  onClick?: () => void
  disableElevation?: boolean
}

export const Button: FC<Props> = ({
  tooltipContent,
  variant,
  color,
  children,
  success,
  danger,
  className,
  disabled,
  ...restProps
}) => {
  const classNames = useClassNames()
  return (
    <StyledButton
      disableElevation
      color={color || 'primary'}
      disabled={disabled && !(success || danger)}
      variant={variant || 'contained'}
      {...restProps}
      className={clsx(classNames.root, className, {
        [classNames.success]: success,
        [classNames.danger]: danger,
        [classNames.disabled]: disabled,
      })}
    >
      {tooltipContent && (
        <Tooltip arrow title={tooltipContent} placement="top-end">
          <img className={classNames.tooltip} src="/assets/icons/tooltip.svg" alt="" />
        </Tooltip>
      )}
      {children}
    </StyledButton>
  )
}
