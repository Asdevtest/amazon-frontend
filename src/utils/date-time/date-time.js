/* eslint-disable no-unused-vars */
import {
  format,
  formatDistance,
  compareDesc,
  compareAsc,
  parseISO,
  formatDistanceStrict,
  formatISO,
  isValid,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  minutesToMilliseconds,
} from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import ruLocale from 'date-fns/locale/ru'

import { SettingsModel } from '@models/settings-model'

export const getYearDate = dateString => format(parseISO(dateString), 'yyyy')

export const convertDaysToSeconds = days => days * 24 * 60 * 60

export const formatDate = dateString => format(parseISO(dateString), 'dd-MM-yyyy') // предпочтительный формат

export const formatDateForShowWithoutParseISO = dateString => format(dateString, 'dd.MM.yyyy HH:mm')

export const formatDateTime = dateString => format(parseISO(dateString), 'MM.dd.yyyy HH:mm')
export const formatNormDateTime = dateString => {
  if (dateString) {
    return format(parseISO(dateString), 'dd.MM.yyyy HH:mm') // предпочтительный формат
  } else {
    return ''
  }
}

export const formatDateTimeHourAndMinutes = dateString => (dateString ? format(parseISO(dateString), 'HH:mm') : '')

export const formatShortDateTime = dateString => (dateString ? format(parseISO(dateString), 'dd.MM.yyyy HH:mm') : '')
export const formatDateWithoutTime = dateString => (dateString ? format(parseISO(dateString), 'dd.MM.yyyy') : '')
export const formatDateOnlyTime = dateString => (dateString ? format(parseISO(dateString), 'HH:mm') : '')

export const formatNormDateTimeWithParseISO = dateString => format(parseISO(dateString), 'dd.MM.yyyy HH:mm') // предпочтительный формат

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
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
    partialMethod: 'ceil',
  })

export const formatDateMonthYear = date =>
  format(parseISO(isValid(date) ? formatISO(date, { representation: 'date' }) : date), 'MMM yyyy', {
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
  })

export const formatDateMonthYearWithoutFormatISO = date =>
  format(parseISO(date), 'MMM yyyy', {
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
  })

export const formatDateDayMonthYear = date =>
  format(parseISO(date), 'dd MMMM yyyy', {
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
  })

export const formatDateDistanceFromNow = date =>
  formatDistance(parseISO(date), new Date(), { addSuffix: true, locale: ruLocale })

export const sortObjectsArrayByFiledDate = fieldName => (a, b) => compareDesc(a[fieldName], b[fieldName])

export const sortObjectsArrayByFiledDateWithParseISO = fieldName => (a, b) =>
  compareDesc(parseISO(a[fieldName]), parseISO(b[fieldName]))

export const sortObjectsArrayByFiledDateWithParseISOAsc = fieldName => (a, b) =>
  compareAsc(parseISO(a[fieldName]), parseISO(b[fieldName]))

export const sortObjectsArrayByFiledDateAsc = fieldName => (a, b) => compareAsc(a[fieldName], b[fieldName])

export const sortObjectsArrayByArrayObjectFiledDateWithParseISO = (array, fieldName, object) =>
  array
    ?.slice()
    ?.sort((a, b) => {
      const first = a && object && a[object] && Math.max(...a[object].map(obj => parseISO(obj[fieldName])))
      const second = b && object && b[object] && Math.max(...b[object].map(obj => parseISO(obj[fieldName])))

      if (first < second) {
        return -1
      }
      if (first > second) {
        return 1
      }
      return 0

      // compareDesc(first, second)
    })
    .reverse()

export const sortObjectsArrayByArrayObjectFiledDateWithParseISOAsc = (array, fieldName, object) =>
  array?.slice()?.sort((a, b) => {
    const first = a && object && a[object] && Math.max(...a[object].map(obj => parseISO(obj[fieldName])))
    const second = b && object && b[object] && Math.max(...b[object].map(obj => parseISO(obj[fieldName])))

    if (first < second) {
      return -1
    }
    if (first > second) {
      return 1
    }
    return 0

    // compareAsc(first, second)
  })

export const getDaysHoursMinutesForMinuter = minutes => ({
  days: Math.floor(minutes / 1440),
  hours: Math.floor((minutes % 1440) / 60),
  minutes: minutes % 60,
})
