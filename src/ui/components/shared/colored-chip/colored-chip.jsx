import { observer } from 'mobx-react'
import { useContext, useState } from 'react'

import { Chip, Tooltip } from '@mui/material'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { useStyles } from './colored-chip.style'

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

    const { classes: styles, cx } = useStyles(styleProps)

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const { hints } = useContext(HintsContext)

    return (
      <div className={styles.chipWrapper}>
        <Chip className={cx(styles.chip, { [styles.chipActive]: !!selected })} {...restProps} onClick={onClickChip} />
        {tooltipAttentionContent || tooltipInfoContent ? (
          <div className={styles.tooltipsWrapper}>
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
                  className={styles.tooltip}
                  src="/assets/icons/attention.svg"
                  onClick={() => setOpenAttentionTooltip(true)}
                /> */}
                <div>
                  <TooltipAttention className={cx(styles.tooltip)} onClick={() => setOpenAttentionTooltip(true)} />
                </div>
              </Tooltip>
            ) : null}

            {tooltipInfoContent && hints ? (
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
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)
