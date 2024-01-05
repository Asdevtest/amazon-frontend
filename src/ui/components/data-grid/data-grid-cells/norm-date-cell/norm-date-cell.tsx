import React, { FC } from 'react'

import { formatDateWithoutTime, formatNormDateTime } from '@utils/date-time'

import { useStyles } from './norm-date-cell.style'

interface NormDateCellProps {
  value: string
  dateWithoutTime?: boolean
}

export const NormDateCell: FC<NormDateCellProps> = React.memo(({ value, dateWithoutTime }) => {
  const { classes: styles } = useStyles()

  return (
    <p className={styles.normDateCellTypo}>
      {value ? (dateWithoutTime ? formatDateWithoutTime(value) : formatNormDateTime(value)) : '-'}
    </p>
  )
})
