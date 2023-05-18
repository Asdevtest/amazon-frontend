import { cx } from '@emotion/css'
// import {ClassNamesArg} from '@emotion/react'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Tab } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import React, {
  /* FC, ReactElement,*/
  useEffect,
  useState,
} from 'react'

import { observer } from 'mobx-react'

import { SettingsModel } from '@models/settings-model'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { useClassNames } from './i-tab.style'

// interface Props {
//   tooltipAttentionContent?: ReactElement | string
//   tooltipInfoContent?: ReactElement | string
//   value: string
//   label: string
//   // classes: any // ClassNamesArg | undefined // Object
// }

export const ITab /* : FC<Props> */ = observer(
  ({ tooltipAttentionContent, tooltipInfoContent, value, label, withIcon, /* classes,*/ ...restProps }) => {
    const { classes: classNames } = useClassNames()

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={classNames.tabWrapper}>
        <Tab
          /* classes={classes} */ icon={
            withIcon && <FiberManualRecordRoundedIcon fontSize="small" className={classNames.icon} />
          }
          iconPosition="end"
          className={classNames.root}
          // classes={{selected: classNames.selected}}
          value={value}
          label={label}
          {...restProps}
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
