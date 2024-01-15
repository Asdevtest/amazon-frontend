import { FC, memo } from 'react'

import { ArrowDownIcon, ArrowUpIcon } from '@components/shared/svg-icons'

import { Arrows, ArrowsType } from '@typings/arrow'

import { useStyles } from './arrow.style'

interface ArrowProps {
  direction: string
  isDisableArrow: boolean
  isSlidesFitOnScreenWithoutArrows: boolean
  onClick: (direction: ArrowsType) => void
}

export const Arrow: FC<ArrowProps> = memo(props => {
  const { direction, isDisableArrow, isSlidesFitOnScreenWithoutArrows, onClick } = props

  const { classes: styles, cx } = useStyles()

  const isDownArrow = direction === Arrows.DOWN
  const ArrowIcon = isDownArrow ? ArrowDownIcon : ArrowUpIcon

  return !isSlidesFitOnScreenWithoutArrows ? (
    <button
      disabled={isDisableArrow}
      className={cx(styles.arrowButton, {
        [styles.arrowIconDisable]: isDisableArrow,
      })}
      onClick={() => onClick(isDownArrow ? Arrows.DOWN : Arrows.UP)}
    >
      <ArrowIcon
        className={cx(styles.arrowIcon, {
          [styles.arrowIconDisable]: isDisableArrow,
        })}
      />
    </button>
  ) : null
})
