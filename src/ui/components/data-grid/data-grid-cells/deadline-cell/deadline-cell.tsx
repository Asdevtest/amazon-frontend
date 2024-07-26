import { TextCell } from '..'
import { FC, memo } from 'react'

import { ONE_DAY_IN_SECONDS } from '@constants/time'

import { formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'

interface DeadlineCellProps {
  deadline: string
  withSeconds?: boolean
}

export const DeadlineCell: FC<DeadlineCellProps> = memo(({ deadline }) => {
  const deadlineColor =
    deadline && getDistanceBetweenDatesInSeconds(deadline) < ONE_DAY_IN_SECONDS ? '#ff1616' : undefined

  return <TextCell color={deadlineColor} text={formatDate(deadline)} />
})
