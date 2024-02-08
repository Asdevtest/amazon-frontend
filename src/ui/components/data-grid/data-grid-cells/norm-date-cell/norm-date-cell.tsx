import { FC, memo } from 'react'

import { formatDateWithoutTime, formatNormDateTime } from '@utils/date-time'

import { useStyles } from './norm-date-cell.style'

interface NormDateCellProps {
  value: string
  dateWithoutTime?: boolean
}

export const NormDateCell: FC<NormDateCellProps> = memo(({ value, dateWithoutTime }) => {
  const { classes: styles } = useStyles()

  const validDate = value ? (dateWithoutTime ? formatDateWithoutTime(value) : formatNormDateTime(value)) : '-'

  return <p className={styles.normDateCellTypo}>{validDate}</p>
})
