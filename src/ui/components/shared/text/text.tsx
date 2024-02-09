import { FC, PropsWithChildren, ReactElement, memo, useContext, useState } from 'react'

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

interface TextProps extends PropsWithChildren {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  tooltipPosition?: tooltipPositions.Center | tooltipPositions.Corner | tooltipPositions.BaseLine
  className?: string
  containerClasses?: string
}

export const Text: FC<TextProps> = memo(props => {
  const { tooltipAttentionContent, tooltipInfoContent, tooltipPosition, children, className, containerClasses } = props

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
      <Typography className={className}>{children}</Typography>

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
              <button onClick={() => setOpenAttentionTooltip(true)}>
                <TooltipAttention className={styles.tooltip} />
              </button>
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
              <button onClick={() => setOpenInfoTooltip(true)}>
                <TooltipInfoIcon className={cx(styles.tooltip, styles.tooltipInfo)} />
              </button>
            </Tooltip>
          ) : null}
        </div>
      ) : null}
    </div>
  )
})
