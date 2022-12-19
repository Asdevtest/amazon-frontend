import {
  format,
  formatDistance,
  compareDesc,
  compareAsc,
  parseISO,
  formatDistanceStrict,
  formatISO,
  isValid,
} from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import ruLocale from 'date-fns/locale/ru'

import {SettingsModel} from '@models/settings-model'

export const getYearDate = dateString => format(parseISO(dateString), 'yyyy')

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

export const formatDateTimeHourAndMinutes = dateString => (dateString ? format(parseISO(dateString), 'HH:mm') : '')

export const formatShortDateTime = dateString => (dateString ? format(parseISO(dateString), 'dd-MM-yyyy HH:mm') : '')
export const formatDateWithoutTime = dateString => (dateString ? format(parseISO(dateString), 'dd-MM-yyyy') : '')

export const formatDateTimeWithParseISO = dateString => format(parseISO(dateString), 'MM-dd-yyyy HH:mm')
export const formatNormDateTimeWithParseISO = dateString => format(parseISO(dateString), 'dd-MM-yyyy HH:mm') // предпочтительный формат

const now = new Date()

export const getDistanceBetweenDatesInSeconds = (firstDate, secondDate) => {
  const date1 = parseISO(firstDate)
  const date2 = secondDate ? parseISO(secondDate) : now

  const timeDiff = Math.round((date1.getTime() - date2.getTime()) / 1000)

  return timeDiff
}

export const formatDateDistanceFromNowStrict = (date, tryNow) =>
  formatDistanceStrict(parseISO(date), tryNow ? tryNow : now, {
    addSuffix: true,
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
    partialMethod: 'ceil',
  })

export const formatDateMonthYear = date =>
  format(parseISO(isValid(date) ? formatISO(date, {representation: 'date'}) : date), 'MMM yyyy', {
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
  })

// export const formatDateMonthYear = date =>
//   format(parseISO(formatISO(date, {representation: 'date'})), 'MMM yyyy', {
//     locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
//   })

export const formatDateMonthYearWithoutFormatISO = date =>
  format(parseISO(date), 'MMM yyyy', {
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
  })

export const formatDateDayMonthYear = date =>
  format(parseISO(date), 'dd MMMM yyyy', {
    locale: SettingsModel.languageTag === 'ru' ? ruLocale : enUS,
  })

export const formatDateDistanceFromNow = date =>
  formatDistance(parseISO(date), now, {addSuffix: true, locale: ruLocale})

export const sortObjectsArrayByFiledDate = fieldName => (a, b) => compareDesc(a[fieldName], b[fieldName])

export const sortObjectsArrayByFiledDateWithParseISO = fieldName => (a, b) =>
  compareDesc(parseISO(a[fieldName]), parseISO(b[fieldName]))

export const sortObjectsArrayByFiledDateAsc = fieldName => (a, b) => compareAsc(a[fieldName], b[fieldName])

export const sortObjectsArrayByFiledDateWithParseISOAsc = fieldName => (a, b) =>
  compareAsc(parseISO(a[fieldName]), parseISO(b[fieldName]))
