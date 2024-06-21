import { FC, memo } from 'react'

import { formatNormDateTimeWithParseISO } from '@utils/date-time'

interface NormDateWithParseISOCellProps {
  value: string
}

export const NormDateWithParseISOCell: FC<NormDateWithParseISOCellProps> = memo(({ value }) => (
  <p>{!value ? '-' : formatNormDateTimeWithParseISO(value)}</p>
))
