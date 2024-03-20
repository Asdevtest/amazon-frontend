import { fromUnixTime } from 'date-fns'
import { FC, memo } from 'react'

import { formatDateForShowWithoutParseISO } from '@utils/date-time'

import { useStyles } from './norm-date-from-unix-cell.style'

interface NormDateFromUnixCellProps {
  value: number
}

export const NormDateFromUnixCell: FC<NormDateFromUnixCellProps> = memo(({ value }) => {
  const { classes: styles } = useStyles()

  return (
    <p className={styles.normDateCellTypo}>{!value ? '-' : formatDateForShowWithoutParseISO(fromUnixTime(value))}</p>
  )
})
