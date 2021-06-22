import {format, formatDistance, parse, compareDesc} from 'date-fns'

export const formatDate = dateString => format(dateString, 'dd-MM-yyyy')

export const formatDateTime = dateTimeString => format(dateTimeString, 'MM-dd-yyyy HH:mm')

const now = new Date()

export const formatDateDistanceFromNow = date => formatDistance(date, now, {addSuffix: true})

export const sortObjectsArrayByFiledDate = fieldName => (a, b) => {
  const dateA = parse(a[fieldName], 'yyyy-MM-dd', now)
  const dateB = parse(b[fieldName], 'yyyy-MM-dd', now)
  return compareDesc(dateA, dateB)
}
