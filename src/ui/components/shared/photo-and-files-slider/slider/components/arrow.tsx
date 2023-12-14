import { FC, memo } from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { useClassNames } from '../slider.style'

import { Arrows, ArrowsType } from '../slider.type'

interface Props {
  direction: string
  isDisableArrow: boolean
  onClick: (direction: ArrowsType) => void
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
}

export const Arrow: FC<Props> = memo(({ direction, isDisableArrow, onClick, smallSlider, mediumSlider, bigSlider }) => {
  const { classes: classNames, cx } = useClassNames()

  const isLeftArrow = direction === Arrows.LEFT
  const ArrowIcon = isLeftArrow ? ArrowLeftIcon : ArrowRightIcon

  return (
    <button
      disabled={isDisableArrow}
      className={cx(classNames.arrowIcon, {
        [classNames.arrowIconDisable]: isDisableArrow,
        [classNames.smallArrow]: smallSlider,
        [classNames.mediumArrow]: mediumSlider,
        [classNames.bigArrow]: bigSlider,
      })}
      onClick={() => onClick(isLeftArrow ? Arrows.LEFT : Arrows.RIGHT)}
    >
      <ArrowIcon
        className={cx(classNames.arrowIcon, {
          [classNames.arrowIconDisable]: isDisableArrow,
          [classNames.smallArrow]: smallSlider,
          [classNames.mediumArrow]: mediumSlider,
          [classNames.bigArrow]: bigSlider,
        })}
      />
    </button>
  )
})
