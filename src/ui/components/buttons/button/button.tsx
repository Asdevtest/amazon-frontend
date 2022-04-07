import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement} from 'react'

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
    <div className={classNames.btnWrapper}>
      <StyledButton
        disableElevation
        color={color || 'primary'}
        disabled={disabled}
        variant={variant || 'contained'}
        className={clsx(classNames.root, className, {
          [classNames.success]: success,
          [classNames.danger]: danger,
          [classNames.disabled]: disabled,
        })}
        {...restProps}
      >
        {children}
      </StyledButton>
      {tooltipContent ? (
        <Tooltip arrow title={tooltipContent} placement="top-end">
          <img className={classNames.tooltip} src="/assets/icons/tooltip.svg" />
        </Tooltip>
      ) : null}
    </div>
  )
}
