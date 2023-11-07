import React, { FC } from 'react'

import { useDataGridCellStyles } from './multiline-status-cell.style'

interface MultilineStatusCellProps {
  status: string
  leftAlign?: boolean
}

export const MultilineStatusCell: FC<MultilineStatusCellProps> = React.memo(({ status, leftAlign }) => {
  const { classes: styles, cx } = useDataGridCellStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={cx(styles.statusMultilineText, { [styles.multilineLeftAlignText]: leftAlign })}>
        {status?.replace(/_/g, ' ')}
      </p>
    </div>
  )
})
