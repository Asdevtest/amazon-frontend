import { FC, memo } from 'react'

import { ArrowDownIcon, ArrowUpIcon } from '@components/shared/svg-icons'

import { Arrows } from '@typings/enums/arrows'
import { ArrowsType } from '@typings/types/arrows'

import { useStyles } from './arrow.style'

interface ArrowProps {
  direction: string
  isDisableArrow: boolean
  isSlidesFitOnScreenWithoutArrows: boolean
  onClick: (direction: ArrowsType) => void
  isModalSize?: boolean
}

export const Arrow: FC<ArrowProps> = memo(props => {
  const { isModalSize, direction, isDisableArrow, isSlidesFitOnScreenWithoutArrows, onClick } = props

  const { classes: styles, cx } = useStyles()

  const isDownArrow = direction === Arrows.DOWN
  const ArrowIcon = isDownArrow ? ArrowDownIcon : ArrowUpIcon

  return !isSlidesFitOnScreenWithoutArrows ? (
    <button
      disabled={isDisableArrow}
      className={cx(styles.arrowButton, {
        [styles.arrowDisable]: isDisableArrow,
        [styles.arrowButtonModalSize]: isModalSize,
      })}
      onClick={() => onClick(isDownArrow ? Arrows.DOWN : Arrows.UP)}
    >
      <ArrowIcon
        className={cx(styles.arrowIcon, {
          [styles.arrowDisable]: isDisableArrow,
          [styles.arrowModalSize]: isModalSize,
        })}
      />
    </button>
  ) : null
})
