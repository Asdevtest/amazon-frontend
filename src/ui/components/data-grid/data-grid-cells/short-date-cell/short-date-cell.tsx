import React, { FC } from 'react'

import { formatShortDateTime } from '@utils/date-time'

import { useStyles } from './short-date-cell.style'

interface ShortDateCellProps {
  value: string
}

export const ShortDateCell: FC<ShortDateCellProps> = React.memo(({ value }) => {
  const { classes: styles } = useStyles()

  return <p className={styles.shortDateCellTypo}>{!value ? '-' : formatShortDateTime(value)}</p>
})
