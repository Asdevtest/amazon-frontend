import React, { FC } from 'react'

import { toFixedWithDollarSign } from '@utils/text'

import { useDataGridCellStyles } from './to-fixed-with-dollar-sign-cell.style'

interface ToFixedWithDollarSignCellProps {
  value: number
  fix?: number
  leftAlign?: boolean
}

export const ToFixedWithDollarSignCell: FC<ToFixedWithDollarSignCellProps> = React.memo(({ value, fix, leftAlign }) => {
  const { classes: styles, cx } = useDataGridCellStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={cx(styles.multilineText, { [styles.multilineLeftAlignText]: leftAlign })}>
        {!value ? (value === 0 ? 0 : '-') : toFixedWithDollarSign(value, fix)}
      </p>
    </div>
  )
})
