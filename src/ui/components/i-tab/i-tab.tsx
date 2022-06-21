import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement} from 'react'

import {Tab} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {useClassNames} from './i-tab.style'

interface Props {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  value: string
  label: string
  classes: any
}

export const ITab: FC<Props> = observer(
  ({tooltipAttentionContent, tooltipInfoContent, value, label, classes, ...restProps}) => {
    const classNames = useClassNames()

    return (
      <div className={classNames.tabWrapper}>
        <Tab classes={classes} className={classNames.root} value={value} label={label} {...restProps} />

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
  },
)
