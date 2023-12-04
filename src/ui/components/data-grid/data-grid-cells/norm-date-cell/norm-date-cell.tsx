import React, { FC } from 'react'

import { formatNormDateTime } from '@utils/date-time'

import { useStyles } from './norm-date-cell.style'

interface NormDateCellProps {
  value: string
}

export const NormDateCell: FC<NormDateCellProps> = React.memo(({ value }) => {
  const { classes: styles } = useStyles()

  return <p className={styles.normDateCellTypo}>{value ? formatNormDateTime(value) : '-'}</p>
})
