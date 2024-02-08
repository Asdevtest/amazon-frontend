import { observer } from 'mobx-react'
import { FC, ReactElement, useContext, useState } from 'react'

import { Tab } from '@mui/material'
import { TabClasses } from '@mui/material/Tab/tabClasses'
import Tooltip from '@mui/material/Tooltip'

import { BulbIcon, TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { useStyles } from './i-tab.style'

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
    const { classes: styles, cx } = useStyles()

    const tabIcon = withIcon ? <BulbIcon className={styles.icon} /> : undefined

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const { hints } = useContext(HintsContext)

    return (
      <div className={styles.tabWrapper}>
        <Tab
          label={label}
          value={value}
          icon={tabIcon}
          iconPosition="end"
          classes={classes ?? { root: styles.root }}
          {...restProps}
        />

        <div className={styles.tooltipsWrapper}>
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
                <TooltipAttention className={styles.tooltip} onClick={() => setOpenAttentionTooltip(true)} />
              </div>
            </Tooltip>
          )}

          {tooltipInfoContent && hints && (
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
                  className={cx(styles.tooltip, styles.tooltipInfo)}
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
