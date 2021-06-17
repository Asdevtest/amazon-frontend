import {format, formatDistance, parseISO, parse} from 'date-fns'

export const formatDate = dateString => format(parseISO(dateString), 'dd-MM-yyyy')

export const formatDateTime = dateTimeString => format(parseISO(dateTimeString), 'MM-dd-yyyy HH:mm')

const now = new Date()

export const formatDateDistanceFromNow = date => formatDistance(parse(date, 'yyyy-MM-dd', now), now, {addSuffix: true})
