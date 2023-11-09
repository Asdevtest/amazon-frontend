import React, { FC } from 'react'

import { toFixedWithKg } from '@utils/text'

import { useDataGridCellStyles } from './to-fixed-with-kg-sign-cell.style'

interface ToFixedWithKgSignCellProps {
  value: number
  fix?: number
}

export const ToFixedWithKgSignCell: FC<ToFixedWithKgSignCellProps> = React.memo(({ value, fix }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={styles.multilineText}>{!value ? (value === 0 ? 0 : '-') : toFixedWithKg(value, fix)}</p>
    </div>
  )
})
