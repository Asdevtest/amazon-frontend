import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'

export const getBorderForDeadline = (timeoutAt: string) => {
  if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 86400) {
    return { border: '2px solid #D70D0D' }
  } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 172800) {
    return { border: '2px solid #C69109' }
  }
}
