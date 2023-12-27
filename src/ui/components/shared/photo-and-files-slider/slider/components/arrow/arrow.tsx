import { FC, memo } from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { useStyles } from './arrow.style'

import { Arrows, ArrowsType } from '../../slider.type'

interface ArrowProps {
  direction: string
  isDisableArrow: boolean
  onClick: (direction: ArrowsType) => void
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
}

export const Arrow: FC<ArrowProps> = memo(props => {
  const { direction, isDisableArrow, onClick, smallSlider, mediumSlider, bigSlider } = props
  const { classes: styles, cx } = useStyles()

  const isLeftArrow = direction === Arrows.LEFT
  const ArrowIcon = isLeftArrow ? ArrowLeftIcon : ArrowRightIcon

  return (
    <button
      disabled={isDisableArrow}
      className={cx(styles.arrowIcon, {
        [styles.arrowIconDisable]: isDisableArrow,
        [styles.smallArrow]: smallSlider,
        [styles.mediumArrow]: mediumSlider,
        [styles.bigArrow]: bigSlider,
        [styles.leftArrow]: isLeftArrow,
        [styles.rightArrow]: !isLeftArrow,
      })}
      onClick={() => onClick(isLeftArrow ? Arrows.LEFT : Arrows.RIGHT)}
    >
      <ArrowIcon
        className={cx(styles.arrowIcon, {
          [styles.arrowIconDisable]: isDisableArrow,
          [styles.smallArrow]: smallSlider,
          [styles.mediumArrow]: mediumSlider,
          [styles.bigArrow]: bigSlider,
        })}
      />
    </button>
  )
})
