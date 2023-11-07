import React, { FC } from 'react'

import { toFixed } from '@utils/text'

import { useDataGridCellStyles } from './to-fixed-cell.style'

export interface ToFixedCellProps {
  value: number
  fix?: number
}

export const ToFixedCell: FC<ToFixedCellProps> = React.memo(({ value, fix }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={styles.multilineText}>{!value ? (value === 0 ? 0 : '-') : toFixed(value, fix)}</p>
    </div>
  )
})
