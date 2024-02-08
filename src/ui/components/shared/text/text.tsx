import { observer } from 'mobx-react'
import { FC, PropsWithChildren, ReactElement, useContext, useState } from 'react'

import { Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { useStyles } from './text.style'

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
    const { classes: styles, cx } = useStyles()

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const { hints } = useContext(HintsContext)
    return (
      <div
        className={cx(
          tooltipPosition && ['corner', 'baseLine'].includes(tooltipPosition)
            ? styles.noFlextextWrapper
            : styles.textWrapper,
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
                ? styles.cornerTooltipsWrapper
                : tooltipPosition === 'baseLine'
                ? styles.baseLineTooltipsWrapper
                : styles.tooltipsWrapper
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
