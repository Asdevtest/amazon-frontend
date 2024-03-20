import { FC, memo } from 'react'

import { useStyles } from './scrolling-cell.style'

interface ScrollingCellProps {
  value: string
  fontSize?: number
}

export const ScrollingCell: FC<ScrollingCellProps> = memo(({ value, fontSize }) => {
  const { classes: styles } = useStyles()
  return (
    <p style={{ fontSize }} className={styles.scrollingValue}>
      {value || '-'}
    </p>
  )
})
