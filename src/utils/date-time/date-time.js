import { compareAsc, compareDesc, format, formatDistanceStrict, formatISO, isValid, parseISO } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import ruLocale from 'date-fns/locale/ru'

import { ONE_HOUR_IN_MILLISECONDS } from '@constants/time'

import { SettingsModel } from '@models/settings-model'

import { getLocalByLanguageTag } from '@components/shared/date-picker/helpers/get-local-by-language-tag'

export const getUtcDateObject = dateString => {
  const date = new Date(dateString)

  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  const UTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
  date.getUTCDate(), date.getUTCHours(),
  date.getUTCMinutes(), date.getUTCSeconds())

  return {
    day,
    month,
    year,
    hours,
    minutes,
    UTC,
  }
}

export const formatDateToCustomFormatInUTC = (dateString, format = 'dd.MM.yyyy HH:mm') => {
  if (!dateString) {
    return ''
  }

  const dateObj = getUtcDateObject(dateString)

  const formattedDate = format
    .replace('dd', dateObj.day)
    .replace('MM', dateObj.month)
    .replace('yyyy', dateObj.year)
    .replace('HH', dateObj.hours)
    .replace('mm', dateObj.minutes)
    .replace('ss', dateObj.seconds)

  return formattedDate
}

export const getYearDate = dateString => formatDateToCustomFormatInUTC(dateString, 'yyyy')

export const convertDaysToSeconds = days => days * 24 * 60 * 60

export const formatDate = dateString => {
  return formatDateToCustomFormatInUTC(dateString, 'dd-MM-yyyy')
} // предпочтительный формат

export const formatDateForShowWithoutParseISO = dateString =>
  formatDateToCustomFormatInUTC(dateString, 'dd.MM.yyyy HH:mm')

export const formatDateTime = dateString => formatDateToCustomFormatInUTC(dateString, 'MM.dd.yyyy HH:mm')

export const formatNormDateTime = dateString => {
  if (dateString) {
    return formatDateToCustomFormatInUTC(dateString, 'dd.MM.yyyy HH:mm') // предпочтительный формат
  } else {
    return ''
  }
}

export const formatDateTimeHourAndMinutes = dateString => formatDateToCustomFormatInUTC(dateString, 'HH:mm')

export const formatShortDateTime = dateString => {
  return formatDateToCustomFormatInUTC(dateString, 'dd.MM.yyyy HH:mm')
}
export const formatDateWithoutTime = dateString => formatDateToCustomFormatInUTC(dateString, 'dd.MM.yyyy')

export const formatDateWithoutYear = dateString => formatDateToCustomFormatInUTC(dateString, 'dd.MM')

export const reversedFormatDateWithoutTime = dateString => formatDateToCustomFormatInUTC(dateString, 'yyyy.MM.dd')

export const formatDateOnlyTime = dateString => formatDateToCustomFormatInUTC(dateString, 'HH:mm')

export const formatNormDateTimeWithParseISO = dateString =>
  formatDateToCustomFormatInUTC(dateString, 'dd.MM.yyyy HH:mm') // предпочтительный формат

export const getDistanceBetweenDatesInSeconds = (firstDate, secondDate) => {
  const date1 = parseISO(firstDate)
  const date2 = secondDate ? secondDate : new Date()

  const timeDiff = Math.round((date1.getTime() - date2.getTime()) / 1000)
  // const timeDiff = (date1.getTime() - date2.getTime()) / 1000

  return timeDiff
}

export const formatDateDistanceFromNowStrict = (date, tryNow) =>
  formatDistanceStrict(parseISO(date), tryNow ? tryNow : new Date(), {
    addSuffix: true,
    locale: getLocalByLanguageTag(SettingsModel.languageTag),
    partialMethod: 'ceil',
  })

export const formatDateMonthYear = date => {
  const formatedDate = format(
    parseISO(isValid(date) ? formatISO(date, { representation: 'date' }) : date),
    'MMM yyyy',
    {
      locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
    },
  )

  return formatedDate
}

export const convertLocalDateToUTC = date => {
  return formatISO(date, { representation: 'date' })
}

export const formatDateMonthYearWithoutFormatISO = date =>
  format(parseISO(date), 'MMM yyyy', {
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
  })

export const formatDateDayMonthYear = date =>
  format(parseISO(date), 'dd MMMM yyyy', {
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
  })

export const sortObjectsArrayByFiledDate = fieldName => (a, b) => compareDesc(a[fieldName], b[fieldName])

export const sortObjectsArrayByFiledDateWithParseISO = fieldName => (a, b) =>
  compareDesc(parseISO(a[fieldName]), parseISO(b[fieldName]))

export const sortObjectsArrayByFiledDateWithParseISOAsc = fieldName => (a, b) =>
  compareAsc(parseISO(a[fieldName]), parseISO(b[fieldName]))

export const getDaysHoursMinutesForMinuter = minutes => ({
  days: Math.floor(minutes / 1440),
  hours: Math.floor((minutes % 1440) / 60),
  minutes: minutes % 60,
})

export const getTomorrowDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)

  return date
}

export const getLocalToUTCDate = date => {
  return new Date(date.valueOf() - date.getTimezoneOffset() * ONE_HOUR_IN_MILLISECONDS)?.toISOString()
}

export const getMinutesDifferenceFromNow = dateString => {
  const currentTime = new Date()
  const inputDate = new Date(dateString)

  const timeDifferenceInMilliseconds = inputDate - currentTime
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60))

  return timeDifferenceInMinutes > 0 ? timeDifferenceInMinutes : 0
}

export const getDateWithoutTime = date => (date ? date.format('YYYY-MM-DD') : null)
