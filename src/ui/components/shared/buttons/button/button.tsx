/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cx } from '@emotion/css'
import { ClassNamesArg } from '@emotion/react'
import React, { FC, PropsWithChildren, ReactElement, useContext, useState } from 'react'

import { Box } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { useClassNames } from './button.style'

import { StyledButton } from './styled-button'

enum tooltipPositions {
  Corner = 'corner',
  Center = 'center',
}

interface Props extends PropsWithChildren {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  tooltipPosition?: tooltipPositions.Center | tooltipPositions.Corner
  variant?: string
  color?: string
  success?: boolean
  danger?: boolean
  border?: boolean
  className?: string
  disabled?: boolean
  onClick?: (target?: any) => void
  disableElevation?: boolean
  btnWrapperStyle?: string | ClassNamesArg
  small?: boolean
  defaultButtonTooltip?: string
  startIcon?: ReactElement
  transparent?: boolean
  casual?: boolean
}

export const Button: FC<Props> = React.memo(
  ({
    defaultButtonTooltip,
    tooltipAttentionContent,
    tooltipInfoContent,
    tooltipPosition,
    variant,
    color,
    children,
    success,
    danger,
    border,
    className,
    disabled,
    btnWrapperStyle,
    small,
    transparent,
    casual,
    ...restProps
  }) => {
    const { classes: classNames } = useClassNames()

    const { hints } = useContext(HintsContext)
    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    return (
      <div className={cx(classNames.btnWrapper, btnWrapperStyle)}>
        {/* @ts-ignore */}
        <StyledButton
          disableElevation
          sx={{ pointerEvents: 'all!important' }}
          title={defaultButtonTooltip || ''}
          color={color || 'primary'}
          disabled={disabled}
          variant={variant || 'contained'}
          classes={{
            root: cx(
              classNames.root,
              {
                [classNames.success]: success,
                [classNames.danger]: danger,
                [classNames.border]: border,
                [classNames.defaultButton]: !success && !danger && !variant,
                [classNames.disabled]: disabled,
                [classNames.small]: small,
                [classNames.transparent]: transparent,
                [classNames.casual]: casual,
                [classNames.outlined]: variant === 'outlined',
              },
              className,
            ),
          }}
          {...restProps}
        >
          {children}
          {tooltipAttentionContent || tooltipInfoContent ? (
            <div
              className={tooltipPosition === 'center' ? classNames.tooltipsCenterWrapper : classNames.tooltipsWrapper}
            >
              {tooltipAttentionContent ? (
                <Tooltip
                  arrow
                  open={openAttentionTooltip}
                  title={tooltipAttentionContent}
                  placement="top-end"
                  onClose={() => setOpenAttentionTooltip(false)}
                  onOpen={() => setOpenAttentionTooltip(true)}
                >
                  <div>
                    <TooltipAttention
                      className={cx(classNames.tooltip)}
                      onClick={() => setOpenAttentionTooltip(true)}
                    />
                  </div>
                </Tooltip>
              ) : null}

              {tooltipInfoContent && hints ? (
                <Tooltip
                  arrow
                  open={openInfoTooltip}
                  title={tooltipInfoContent}
                  placement="top-end"
                  onClose={() => setOpenInfoTooltip(false)}
                  onOpen={() => setOpenInfoTooltip(true)}
                >
                  <Box display="flex" alignItems="center">
                    <TooltipInfoIcon
                      className={cx(classNames.tooltip, classNames.tooltipInfo)}
                      viewBox={'0 0 18 18'}
                      onClick={() => setOpenInfoTooltip(true)}
                    />
                  </Box>
                </Tooltip>
              ) : null}
            </div>
          ) : null}
        </StyledButton>
      </div>
    )
  },
)
