import {React} from 'react'

import {Chip, makeStyles} from '@material-ui/core'
import clsx from 'clsx'

const useChipStyles = makeStyles(() => ({
  chip: props => ({
    color: '#000',
    fontSize: '14px',
    backgroundColor: props.color,
    '&:hover, &:focus': {
      backgroundColor: props.colorHover,
    },
  }),
  chipActive: () => ({
    color: '#fff',
  }),
}))

export const ColoredChip = ({color = 'rgb(0, 123, 255)', colorHover = '#1269ec', selected = false, ...restProps}) => {
  const styleProps = {color, colorHover}
  const classes = useChipStyles(styleProps)
  return <Chip className={clsx(classes.chip, {[classes.chipActive]: selected})} {...restProps} />
}
