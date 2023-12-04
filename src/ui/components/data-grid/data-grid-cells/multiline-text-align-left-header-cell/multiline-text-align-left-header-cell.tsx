import React, { FC } from 'react'

import { useStyles } from './multiline-text-align-left-header-cell.style'

interface MultilineTextAlignLeftHeaderCellProps {
  text: string
}

export const MultilineTextAlignLeftHeaderCell: FC<MultilineTextAlignLeftHeaderCellProps> = React.memo(({ text }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.multilineTextAlignLeftHeaderWrapper}>
      <p className={styles.multilineTextAlignLeftHeader}>{text}</p>
    </div>
  )
})
