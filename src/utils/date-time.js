import {format, formatDistance, compareDesc, parseISO} from 'date-fns'

export const formatDate = dateString => format(parseISO(dateString), 'dd-MM-yyyy') // предпочтительный формат
export const formatDateForBackend = dateString => format(parseISO(dateString), 'yyyy-MM-dd')

export const formatDateForBackendWithoutParseISO = dateString => format(dateString, 'yyyy-MM-dd')

export const formatDateForShowWithoutParseISO = dateString => format(dateString, 'dd-MM-yyyy HH:mm')

export const formatDateTime = dateString => format(parseISO(dateString), 'MM-dd-yyyy HH:mm')
export const formatNormDateTime = dateString => {
  if (dateString) {
    return format(parseISO(dateString), 'dd-MM-yyyy HH:mm') // предпочтительный формат
  } else {
    return ''
  }
}

export const formatDateTimeWithParseISO = dateString => format(parseISO(dateString), 'MM-dd-yyyy HH:mm')
export const formatNormDateTimeWithParseISO = dateString => format(parseISO(dateString), 'dd-MM-yyyy HH:mm') // предпочтительный формат
const now = new Date()

export const formatDateDistanceFromNow = date => formatDistance(parseISO(date), now, {addSuffix: true})

export const sortObjectsArrayByFiledDate = fieldName => (a, b) =>
  compareDesc(parseISO(a[fieldName]), parseISO(b[fieldName]))

export const sortObjectsArrayByFiledDateWithParseISO = fieldName => (a, b) =>
  compareDesc(parseISO(a[fieldName]), parseISO(b[fieldName]))
