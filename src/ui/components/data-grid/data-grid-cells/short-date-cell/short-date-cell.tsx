import React, { FC } from 'react'

import { formatShortDateTime } from '@utils/date-time'

import { useDataGridCellStyles } from './short-date-cell.style'

interface ShortDateCellProps {
  value: string
}

export const ShortDateCell: FC<ShortDateCellProps> = React.memo(({ value }) => {
  const { classes: styles } = useDataGridCellStyles()

  return <p className={styles.shortDateCellTypo}>{!value ? '-' : formatShortDateTime(value)}</p>
})
