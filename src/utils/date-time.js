import {format, formatDistance, compareDesc, parseISO} from 'date-fns'

export const formatDate = dateString => format(dateString, 'dd-MM-yyyy') // предпочтительный формат
export const formatDateForBackend = dateString => format(dateString, 'yyyy-MM-dd')

export const formatDateTime = dateString => format(dateString, 'MM-dd-yyyy HH:mm')
export const formatNormDateTime = dateString => format(dateString, 'dd-MM-yyyy HH:mm') // предпочтительный формат

export const formatDateTimeWithParseISO = dateString => format(parseISO(dateString), 'MM-dd-yyyy HH:mm')
export const formatNormDateTimeWithParseISO = dateString => format(parseISO(dateString), 'dd-MM-yyyy HH:mm') // предпочтительный формат

const now = new Date()

export const formatDateDistanceFromNow = date => formatDistance(date, now, {addSuffix: true})

export const sortObjectsArrayByFiledDate = fieldName => (a, b) => compareDesc(a[fieldName], b[fieldName])

export const sortObjectsArrayByFiledDateWithParseISO = fieldName => (a, b) =>
  compareDesc(parseISO(a[fieldName]), parseISO(b[fieldName]))
