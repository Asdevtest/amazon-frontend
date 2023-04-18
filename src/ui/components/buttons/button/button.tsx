import {cx} from '@emotion/css'
import {Box} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement, useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {TooltipAttention, TooltipInfoIcon} from '@constants/svg-icons'

import {SettingsModel} from '@models/settings-model'

import {useClassNames} from './button.style'
import {StyledButton} from './styled-button'

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
  className?: string
  disabled?: boolean
  onClick?: () => void
  disableElevation?: boolean
  btnWrapperStyle?: string
  children?: ReactElement | string
}

export const Button: FC<Props> = observer(
  ({
    tooltipAttentionContent,
    tooltipInfoContent,
    tooltipPosition,
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
    const {classes: classNames} = useClassNames()

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={cx(classNames.btnWrapper, btnWrapperStyle)}>
        <StyledButton
          disableElevation
          color={color || 'primary'}
          disabled={disabled}
          variant={variant || 'contained'}
          classes={{
            root: cx(
              classNames.root,
              {
                [classNames.success]: success,
                [classNames.danger]: danger,
                // [classNames.disabled]: disabled,
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
