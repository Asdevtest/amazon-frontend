import React, { FC } from 'react'

import { formatDateWithoutTime } from '@utils/date-time'

import { useStyles } from './norm-date-without-time-cell.style'

interface NormDateWithoutTimeCellProps {
  value: string
}

export const NormDateWithoutTimeCell: FC<NormDateWithoutTimeCellProps> = React.memo(({ value }) => {
  const { classes: styles } = useStyles()

  return <p className={styles.normDateCellTypo}>{!value ? '-' : formatDateWithoutTime(value)}</p>
})
