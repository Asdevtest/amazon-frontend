import {format, parseISO} from 'date-fns'

export const formatDate = dateString => format(parseISO(dateString), 'dd-MM-yyyy')

export const formatDateTime = dateTimeString => format(parseISO(dateTimeString), 'MM-dd-yyyy HH:mm')
