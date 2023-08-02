import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { FC, ReactElement, useEffect, useState } from 'react'

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Tab } from '@mui/material'
import { TabClasses } from '@mui/material/Tab/tabClasses'
import Tooltip from '@mui/material/Tooltip'

import { SettingsModel } from '@models/settings-model'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { useClassNames } from './i-tab.style'

interface Props {
  label: string
  value?: string
  withIcon?: boolean
  classes?: Partial<TabClasses>
  tooltipInfoContent?: ReactElement | string
  tooltipAttentionContent?: ReactElement | string
}

export const ITab: FC<Props> = observer(
  ({ tooltipAttentionContent, tooltipInfoContent, value, label, withIcon, classes, ...restProps }) => {
    const { classes: classNames } = useClassNames()

    const tabIcon = withIcon ? <FiberManualRecordRoundedIcon fontSize="small" className={classNames.icon} /> : undefined

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={classNames.tabWrapper}>
        <Tab
          label={label}
          value={value}
          icon={tabIcon}
          iconPosition="end"
          classes={classes ?? { root: classNames.root }}
          {...restProps}
        />

        <div className={classNames.tooltipsWrapper}>
          {tooltipAttentionContent && (
            <Tooltip
              arrow
              open={openAttentionTooltip}
              title={tooltipAttentionContent}
              placement="top-end"
              onClose={() => setOpenAttentionTooltip(false)}
              onOpen={() => setOpenAttentionTooltip(true)}
            >
              <div>
                {/* <img
                  className={classNames.tooltip}
                  src="/assets/icons/attention.svg"
                  onClick={() => setOpenAttentionTooltip(true)}
                /> */}
                <TooltipAttention className={classNames.tooltip} onClick={() => setOpenAttentionTooltip(true)} />
              </div>
            </Tooltip>
          )}

          {tooltipInfoContent && showHints && (
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
          )}
        </div>
      </div>
    )
  },
)
