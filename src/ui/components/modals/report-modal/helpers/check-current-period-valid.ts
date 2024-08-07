export const checkCurrentPeriodValid = (dateTo?: string): boolean => {
  if (!dateTo) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dateToObj = new Date(dateTo)
  dateToObj.setHours(0, 0, 0, 0)

  return dateToObj < today
}
