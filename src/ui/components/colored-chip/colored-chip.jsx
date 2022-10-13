import {cx} from '@emotion/css'
import {Chip, Tooltip} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {SettingsModel} from '@models/settings-model'

import {useClassNames} from './colored-chip.style'

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
    const styleProps = {color, colorHover}

    const {classes: classNames} = useClassNames(styleProps)

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={classNames.chipWrapper} onClick={onClickChip}>
        <Chip className={cx(classNames.chip, {[classNames.chipActive]: !!selected})} {...restProps} />
        {tooltipAttentionContent || tooltipInfoContent ? (
          <div className={classNames.tooltipsWrapper}>
            {tooltipAttentionContent ? (
              <Tooltip arrow title={tooltipAttentionContent} placement="top-end">
                <img className={classNames.tooltip} src="/assets/icons/attention.svg" />
              </Tooltip>
            ) : null}

            {tooltipInfoContent && showHints ? (
              <Tooltip arrow title={tooltipInfoContent} placement="top-end">
                <img className={cx(classNames.tooltip, classNames.tooltipInfo)} src="/assets/icons/info-q.svg" />
              </Tooltip>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)
