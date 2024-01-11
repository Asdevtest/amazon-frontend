import { FC, memo } from 'react'

import { ONE_DAY_IN_SECONDS } from '@constants/time'

import { formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { timeToDeadlineInHoursAndMins } from '@utils/text'

import { MultilineTextCell } from '../data-grid-cells'

interface DeadlineCellProps {
  deadline: string
  withSeconds?: boolean
}

export const DeadlineCell: FC<DeadlineCellProps> = memo(({ deadline, withSeconds = false }) => {
  const deadlineTooltip = deadline ? timeToDeadlineInHoursAndMins({ date: deadline, withSeconds, now: new Date() }) : ''
  const deadlineColor =
    deadline && getDistanceBetweenDatesInSeconds(deadline) < ONE_DAY_IN_SECONDS ? '#ff1616' : undefined
  const deadlineText = deadline ? formatDate(deadline) : '-'

  return <MultilineTextCell withLineBreaks tooltipText={deadlineTooltip} color={deadlineColor} text={deadlineText} />
})
