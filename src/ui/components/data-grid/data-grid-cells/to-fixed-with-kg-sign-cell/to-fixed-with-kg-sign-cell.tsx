import React, { FC } from 'react'

import { toFixedWithKg } from '@utils/text'

import { useStyles } from './to-fixed-with-kg-sign-cell.style'

interface ToFixedWithKgSignCellProps {
  value: number
  fix?: number
}

export const ToFixedWithKgSignCell: FC<ToFixedWithKgSignCellProps> = React.memo(({ value, fix }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={styles.multilineText}>{!value ? (value === 0 ? 0 : '-') : toFixedWithKg(value, fix)}</p>
    </div>
  )
})
