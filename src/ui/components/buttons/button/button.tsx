import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement} from 'react'

import clsx from 'clsx'

import {useClassNames} from './button.style'
import {StyledButton} from './styled-button'

interface Props {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  variant?: string
  color?: string
  success?: boolean
  danger?: boolean
  className: string
  disabled?: boolean
  onClick?: () => void
  disableElevation?: boolean
  btnWrapperStyle?: string
}

export const Button: FC<Props> = ({
  tooltipAttentionContent,
  tooltipInfoContent,
  variant,
  color,
  children,
  success,
  danger,
  className,
  disabled,
  btnWrapperStyle,
  ...restProps
}) => {
  const classNames = useClassNames()
  return (
    <div className={clsx(classNames.btnWrapper, btnWrapperStyle)}>
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
      {tooltipAttentionContent || tooltipInfoContent ? (
        <div className={classNames.tooltipsWrapper}>
          {tooltipAttentionContent ? (
            <Tooltip arrow title={tooltipAttentionContent} placement="top-end">
              <img className={classNames.tooltip} src="/assets/icons/attention.svg" />
            </Tooltip>
          ) : null}

          {tooltipInfoContent ? (
            <Tooltip arrow title={tooltipInfoContent} placement="top-end">
              <img className={clsx(classNames.tooltip, classNames.tooltipInfo)} src="/assets/icons/info-q.svg" />
            </Tooltip>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
