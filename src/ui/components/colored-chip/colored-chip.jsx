import {React} from 'react'

import {Chip, Tooltip} from '@material-ui/core'
import clsx from 'clsx'

import {useClassNames} from './colored-chip.style'

export const ColoredChip = ({
  color = 'rgb(0, 123, 255)',
  colorHover = '#1269ec',
  selected = false,
  tooltipInfoContent,
  tooltipAttentionContent,
  ...restProps
}) => {
  const styleProps = {color, colorHover}
  const classNames = useClassNames(styleProps)
  return (
    <div className={classNames.chipWrapper}>
      <Chip className={clsx(classNames.chip, {[classNames.chipActive]: selected})} {...restProps} />
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
}
