import {cx} from '@emotion/css'
// import {ClassNamesArg} from '@emotion/react'
import {Tab} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import React, {
  /* FC, ReactElement,*/
  useEffect,
  useState,
} from 'react'

import {observer} from 'mobx-react'

import {TooltipInfoIcon} from '@constants/svg-icons'

import {SettingsModel} from '@models/settings-model'

import {useClassNames} from './i-tab.style'

// interface Props {
//   tooltipAttentionContent?: ReactElement | string
//   tooltipInfoContent?: ReactElement | string
//   value: string
//   label: string
//   // classes: any // ClassNamesArg | undefined // Object
// }

export const ITab /* : FC<Props> */ = observer(
  ({tooltipAttentionContent, tooltipInfoContent, value, label, /* classes,*/ ...restProps}) => {
    const {classes: classNames} = useClassNames()

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={classNames.tabWrapper}>
        <Tab /* classes={classes} */ className={classNames.root} value={value} label={label} {...restProps} />

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
                <img
                  className={classNames.tooltip}
                  src="/assets/icons/attention.svg"
                  onClick={() => setOpenAttentionTooltip(true)}
                />
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
