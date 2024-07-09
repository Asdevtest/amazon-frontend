export const getDistanceBetweenDatesSeconds = (firstDate: Date, secondDate: Date) => {
  const date1 = firstDate ? firstDate : new Date()
  const date2 = secondDate ? secondDate : new Date()

  const timeDiff = Math.round((date1.getTime() - date2.getTime()) / 1000)

  return timeDiff
}
