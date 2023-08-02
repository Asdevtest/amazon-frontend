import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { Chip, Tooltip } from '@mui/material'

import { SettingsModel } from '@models/settings-model'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { useClassNames } from './colored-chip.style'

export const ColoredChip = observer(
  ({
    color = 'rgb(0, 123, 255)',
    colorHover = '#1269ec',
    selected = false,
    tooltipInfoContent,
    tooltipAttentionContent,

    onClickChip,
    // label,

    ...restProps
  }) => {
    const styleProps = { color, colorHover }

    const { classes: classNames } = useClassNames(styleProps)

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={classNames.chipWrapper}>
        <Chip
          className={cx(classNames.chip, { [classNames.chipActive]: !!selected })}
          {...restProps}
          onClick={onClickChip}
        />
        {tooltipAttentionContent || tooltipInfoContent ? (
          <div className={classNames.tooltipsWrapper}>
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
