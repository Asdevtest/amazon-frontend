import { FC, memo } from 'react'

import { toFixed } from '@utils/text'

import { useStyles } from './to-fixed-cell.style'

export interface ToFixedCellProps {
  value: number
  fix?: number
}

export const ToFixedCell: FC<ToFixedCellProps> = memo(({ value, fix }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={styles.multilineText}>{!value ? (value === 0 ? 0 : '-') : toFixed(value, fix)}</p>
    </div>
  )
})
