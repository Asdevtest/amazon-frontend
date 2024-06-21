import { ONE_DAY_IN_SECONDS } from '@constants/time'

import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'

export const getBorderForDeadline = (timeoutAt: string) => {
  if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS) {
    return { border: '2px solid #D70D0D' }
  } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS * 2) {
    return { border: '2px solid #C69109' }
  }
}
