import React, { FC } from 'react'

import { useDataGridCellStyles } from './scrolling-cell.style'

interface ScrollingCellProps {
  value: string
  fontSize?: number
}

export const ScrollingCell: FC<ScrollingCellProps> = React.memo(({ value, fontSize }) => {
  const { classes: styles } = useDataGridCellStyles()
  return (
    <p style={{ fontSize }} className={styles.scrollingValue}>
      {value || '-'}
    </p>
  )
})
