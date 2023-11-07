import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { FC, PropsWithChildren, ReactElement, useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import { SettingsModel } from '@models/settings-model'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { useClassNames } from './text.style'

enum tooltipPositions {
  Corner = 'corner',
  Center = 'center',
  BaseLine = 'baseLine',
}

interface Props extends PropsWithChildren {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  tooltipPosition?: tooltipPositions.Center | tooltipPositions.Corner | tooltipPositions.BaseLine
  className?: string
  containerClasses?: string
  style?: {}
}

export const Text: FC<Props> = observer(
  ({ tooltipAttentionContent, tooltipInfoContent, tooltipPosition, children, className, containerClasses, style }) => {
    const { classes: classNames } = useClassNames()

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div
        className={cx(
          tooltipPosition && ['corner', 'baseLine'].includes(tooltipPosition)
            ? classNames.noFlextextWrapper
            : classNames.textWrapper,
          containerClasses,
        )}
      >
        <Typography className={className} style={style}>
          {children}
        </Typography>

        {tooltipAttentionContent || tooltipInfoContent ? (
          <div
            className={
              tooltipPosition === 'corner'
                ? classNames.cornerTooltipsWrapper
                : tooltipPosition === 'baseLine'
                ? classNames.baseLineTooltipsWrapper
                : classNames.tooltipsWrapper
            }
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
                <div>
                  <TooltipInfoIcon
                    className={cx(classNames.tooltip, classNames.tooltipInfo)}
                    onClick={() => setOpenInfoTooltip(true)}
                  />
                </div>
              </Tooltip>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)
