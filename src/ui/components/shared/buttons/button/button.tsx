/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { FC, ReactElement, useEffect, useState } from 'react'

import { Box } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import { SettingsModel } from '@models/settings-model'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { useClassNames } from './button.style'
import { StyledButton } from './styled-button'

enum tooltipPositions {
  Corner = 'corner',
  Center = 'center',
}

interface Props {
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
  onClick?: () => void
  disableElevation?: boolean
  btnWrapperStyle?: string
  small?: boolean
  children?: ReactElement | string
  defaultButtonTooltip?: string
}

export const Button: FC<Props> = observer(
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
    ...restProps
  }) => {
    const { classes: classNames } = useClassNames()

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={cx(classNames.btnWrapper, btnWrapperStyle)}>
        {/* @ts-ignore */}
        <StyledButton
          disableElevation
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
              },
              className,
            ),
          }}
          {...restProps}
        >
          {children}
        </StyledButton>
        {tooltipAttentionContent || tooltipInfoContent ? (
          <div className={tooltipPosition === 'center' ? classNames.tooltipsCenterWrapper : classNames.tooltipsWrapper}>
            {tooltipAttentionContent ? (
              <Tooltip
                arrow
                open={openAttentionTooltip}
                title={tooltipAttentionContent}
                placement="top-end"
                onClose={() => setOpenAttentionTooltip(false)}
                onOpen={() => setOpenAttentionTooltip(true)}
              >
                {/* <img
                  className={classNames.tooltip}
                  src="/assets/icons/attention.svg"
                  onClick={() => setOpenAttentionTooltip(true)}
                /> */}

                <div>
                  <TooltipAttention className={cx(classNames.tooltip)} onClick={() => setOpenAttentionTooltip(true)} />
                </div>
              </Tooltip>
            ) : null}

            {tooltipInfoContent && showHints ? (
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
                    // fontSize={'small'}
                    viewBox={'0 0 18 18'}
                    onClick={() => setOpenInfoTooltip(true)}
                  />
                </Box>
              </Tooltip>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)
