import {format, formatDistance, compareDesc, parseISO} from 'date-fns'

export const formatDate = dateString => format(parseISO(dateString), 'dd-MM-yyyy')
export const formatDateForBackend = dateString => format(parseISO(dateString), 'yyyy-MM-dd')

export const formatDateTime = dateString => format(parseISO(dateString), 'MM-dd-yyyy HH:mm')

const now = new Date()

export const formatDateDistanceFromNow = date => formatDistance(parseISO(date), now, {addSuffix: true})

export const sortObjectsArrayByFiledDate = fieldName => (a, b) => compareDesc(a[fieldName], b[fieldName])
