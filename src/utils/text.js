import {hoursToSeconds, secondsToHours, secondsToMinutes} from 'date-fns'
import * as Showdown from 'showdown'
import * as xssFilter from 'showdown-xss-filter'

import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {checkIsAbsoluteUrl} from './checks'
import {getDistanceBetweenDatesInSeconds} from './date-time'
import {t} from './translations'

export const getModelNameWithotPostfix = modelName => modelName.replace('Static', '')

export const trimBarcode = value => (value.length >= 8 ? String(value.substr(-8)) : value)

export const replaceDollarSign = str => (str ? str.replace('$', '') : str)

export const toFixed = (int, x) => (int && typeof int === 'number' ? int.toFixed(x) : int)

export const getFloat = str => (str ? parseFloat(str) || 0 : str)
export const getFloatOrZero = str => (str ? parseFloat(str) || 0 : 0)
export const getInt = str => (str ? parseFloat(str) || 0 : str)
export const getIntOrZero = str => (str ? parseInt(str) || 0 : 0)

export const getFloatWithoutDollarSign = str => (str ? getFloat(replaceDollarSign(str)) : str)

export const toFixedWithDollarSign = (int, x) => withDollarSign(toFixed(int, x))
export const toFixedWithYuanSign = (int, x) => withYuanSign(toFixed(int, x))

export const toFixedWithKg = (int, x) => withKg(toFixed(int, x))
export const toFixedWithCm = (int, x) => withCm(toFixed(int, x))

export const withDollarSign = str => (str && str !== '0' ? `$${str}` : str)
export const withYuanSign = str => (str && str !== '0' ? `Ұ${str}` : str)
export const withKg = str => (str && str !== '0' ? `${str} ${t(TranslationKey.kg)}` : str)
export const withAmount = str => (str && str !== '0' ? `${str} ${t(TranslationKey['pcs.'])}` : str)
export const withCm = str => (str && str !== '0' ? `${str} ${t(TranslationKey.cm)}` : str)

export const withText = (str, text) => (str && str !== 0 ? `${str}${text}` : str)

export const checkAndMakeAbsoluteUrl = urlStr => (checkIsAbsoluteUrl(urlStr) ? urlStr : `https://${urlStr}`)

export const clearSpecialCharacters = str => str.replace(/[{}"!@#$%^&*()+=;:`~|'?/.><, ]/, '')

export const shortenLongString = (value, lengthBreakpoint) =>
  value.length > lengthBreakpoint ? `${value.slice(0, lengthBreakpoint)}...` : value

export const shortenDocumentString = value => {
  const strAfterPdf = value.slice(0, 4)
  const strPdf = value.slice(-4, value.length)
  return `${strAfterPdf}...${strPdf}`
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: [xssFilter],
})

export const getTextFromMarkdown = markdown => converter.makeHtml(markdown)

export const minsToTime = mins =>
  `${mins / 60 >= 1 ? Math.floor(mins / 60) + t(TranslationKey.hour) : ''}  ${
    mins % 60 === 0 ? '' : (mins % 60) + ' ' + t(TranslationKey.minute) + '.'
  }`

export const getFullTariffTextForBoxOrOrder = box => {
  if (!box || (!box.destination && !box.logicsTariff)) {
    return t(TranslationKey['Not available'])
  }

  const firstNumOfCode = box.destination?.zipCode?.[0] || null

  const regionOfDeliveryName =
    firstNumOfCode === null ? null : zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  return `${box.logicsTariff?.name || ''}${regionOfDeliveryName ? ' / ' + regionOfDeliveryName : ''}${
    box.logicsTariff?.conditionsByRegion?.[regionOfDeliveryName]?.rate
      ? ' / ' + box.logicsTariff?.conditionsByRegion?.[regionOfDeliveryName]?.rate + '$'
      : ''
  }`
}

export const shortSku = value => {
  const shortTitle = value.length > 12 ? value.slice(0, 12) + '...' : value
  return shortTitle
}
export const shortAsin = value => {
  const shortTitle = value.length > 10 ? value.slice(0, 10) + '...' : value
  return shortTitle
}

export const timeToDeadlineInHoursAndMins = ({date, withSeconds, now}) => {
  const secondsToDeadline = getDistanceBetweenDatesInSeconds(date, now)

  const isExpired = secondsToDeadline < 0

  const absSecondsToDeadline = Math.abs(secondsToDeadline)

  const hours = secondsToHours(absSecondsToDeadline)

  const mins = secondsToMinutes(absSecondsToDeadline - hoursToSeconds(hours))

  const seconds = secondsToMinutes(absSecondsToDeadline - hoursToSeconds(hours))

  // console.log({secondsToDeadline, isExpired, hours, mins})

  return `${isExpired ? t(TranslationKey['Overdue by']) + '\n' : ''} ${hours} ${t(TranslationKey.hour)} ${mins} ${
    t(TranslationKey.minute) + '.'
  }${withSeconds ? seconds + t(TranslationKey['s.']) : ''}`
}
