import { fromUnixTime } from 'date-fns'
import React, { FC } from 'react'

import { formatDateForShowWithoutParseISO } from '@utils/date-time'

import { useDataGridCellStyles } from './norm-date-from-unix-cell.style'

interface NormDateFromUnixCellProps {
  value: number
}

export const NormDateFromUnixCell: FC<NormDateFromUnixCellProps> = React.memo(({ value }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <p className={styles.normDateCellTypo}>{!value ? '-' : formatDateForShowWithoutParseISO(fromUnixTime(value))}</p>
  )
})
