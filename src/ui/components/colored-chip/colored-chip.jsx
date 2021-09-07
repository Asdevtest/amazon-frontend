import {React} from 'react'

import {Chip} from '@material-ui/core'
import clsx from 'clsx'

import {useClassNames} from './colored-chip.style'

export const ColoredChip = ({color = 'rgb(0, 123, 255)', colorHover = '#1269ec', selected = false, ...restProps}) => {
  const styleProps = {color, colorHover}
  const classNames = useClassNames(styleProps)
  return <Chip className={clsx(classNames.chip, {[classNames.chipActive]: selected})} {...restProps} />
}
