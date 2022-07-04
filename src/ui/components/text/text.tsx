import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement, useEffect, useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {SettingsModel} from '@models/settings-model'

import {useClassNames} from './text.style'

interface Props {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  textClasses?: string
  containerClasses?: string
}

export const Text: FC<Props> = observer(
  ({tooltipAttentionContent, tooltipInfoContent, children, textClasses, containerClasses}) => {
    const classNames = useClassNames()

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={clsx(classNames.textWrapper, containerClasses)}>
        <Typography className={textClasses}>{children}</Typography>

        {tooltipAttentionContent || tooltipInfoContent ? (
          <div className={classNames.tooltipsWrapper}>
            {tooltipAttentionContent ? (
              <Tooltip arrow title={tooltipAttentionContent} placement="top-end">
                <img className={classNames.tooltip} src="/assets/icons/attention.svg" />
              </Tooltip>
            ) : null}

            {tooltipInfoContent && showHints ? (
              <Tooltip arrow title={tooltipInfoContent} placement="top-end">
                <img className={clsx(classNames.tooltip, classNames.tooltipInfo)} src="/assets/icons/info-q.svg" />
              </Tooltip>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)
