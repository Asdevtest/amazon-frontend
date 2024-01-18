/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, memo } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Tooltip } from '@mui/material'

import { useStyles } from './multiline-text-header-cell.style'

interface MultilineTextHeaderCellProps {
  text?: string
  withIcon?: boolean
  isShowIconOnHover?: boolean
  isFilterActive?: boolean
  component?: React.ReactNode
  textCenter?: boolean
  color?: string
  withTooltip?: boolean
  tooltipText?: string
}

export const MultilineTextHeaderCell: FC<MultilineTextHeaderCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    text = '',
    withIcon,
    isShowIconOnHover,
    isFilterActive,
    component,
    textCenter,
    color,
    withTooltip,
    tooltipText,
  } = props

  return (
    <div
      className={cx(styles.multilineTextHeaderWrapper, {
        [styles.multilineTextHeaderCenter]: !!textCenter,
        [styles.multilineTextHeaderSpaceBetween]: !!component,
      })}
    >
      <Tooltip title={withTooltip ? tooltipText || text : ''}>
        {/* @ts-ignore */}
        <p className={styles.multilineHeaderText} style={color && { color }}>
          {text}
        </p>
      </Tooltip>
      {component}
      {withIcon || isShowIconOnHover || isFilterActive ? (
        <FilterAltOutlinedIcon
          className={cx(styles.headerIcon, {
            [styles.headerIconBlue]: isFilterActive,
          })}
        />
      ) : null}
    </div>
  )
})
