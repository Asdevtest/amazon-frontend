import {hoursToSeconds, secondsToHours, secondsToMinutes} from 'date-fns'
import QueryString from 'qs'

import {columnnsKeys} from '@constants/data-grid-columns-keys'
import {ProductStatusByCode, productStatusTranslateKey} from '@constants/product-status'
import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {checkIsAbsoluteUrl} from '@utils/checks'

import {getDistanceBetweenDatesInSeconds} from '../date-time'
import {t} from '../translations'

export const getShortenStringIfLongerThanCount = (str, count, showEnd) =>
  str?.length > count ? `${str.slice(0, count)}...${showEnd ? str.slice(str.length - 3) : ''}` : str

export const getModelNameWithotPostfix = modelName =>
  modelName && typeof modelName === 'string' ? modelName.replace('Static', '') : null

export const trimBarcode = value => (value && value.length >= 8 ? String(value.substr(-8)) : value)

// export const replaceDollarSign = str => (str ? str.replace('$', '') : str) // Не используется

export const toFixed = (int, x) => (int && typeof int === 'number' ? int.toFixed(x) : int)

// export const getFloat = str => (str ? parseFloat(str) || 0 : str) // Не используется
export const getFloatOrZero = str => (str ? parseFloat(str) || 0 : 0)
// export const getInt = str => (str ? parseFloat(str) || 0 : str) // Не используется
// export const getIntOrZero = str => (str ? parseInt(str) || 0 : 0) // Не используется

// export const getFloatWithoutDollarSign = str => (str ? getFloat(replaceDollarSign(str)) : str) // Не используется

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

export const clearSpecialCharacters = value =>
  typeof value === 'string' ? value.replace(/[{}"!@#$%^&*()+=;:`~|'?/.><, ]/, '') : value

export const clearEverythingExceptNumbers = value => (typeof value === 'string' ? value.replace(/\D/gi, '') : value)

// export const shortenLongString = (value, lengthBreakpoint) => // Не используется
//   value.length > lengthBreakpoint ? `${value.slice(0, lengthBreakpoint)}...` : value

export const shortenDocumentString = value => {
  if (typeof value === 'string') {
    const strAfterPdf = value.slice(0, 4)
    const strPdf = value.slice(-4, value.length)
    return `${strAfterPdf}...${strPdf}`
  } else {
    return null
  }
}

export const minsToTime = mins => {
  if (typeof mins === 'number') {
    return `${mins / 60 >= 1 ? Math.floor(mins / 60) + ' ' + t(TranslationKey.hour) : ''} ${
      mins % 60 === 0 ? '' : (mins % 60) + ' ' + t(TranslationKey.minute) + '.'
    }`
  } else {
    return null
  }
}

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

export const shortSku = value => getShortenStringIfLongerThanCount(value, 12)
export const shortAsin = value => getShortenStringIfLongerThanCount(value, 10)

export const timeToDeadlineInHoursAndMins = ({date, withSeconds, now}) => {
  const secondsToDeadline = getDistanceBetweenDatesInSeconds(date, now)

  const isExpired = secondsToDeadline < 0

  const absSecondsToDeadline = Math.abs(secondsToDeadline)

  const hours = secondsToHours(absSecondsToDeadline)

  const mins = secondsToMinutes(absSecondsToDeadline - hoursToSeconds(hours))

  const seconds = secondsToMinutes(absSecondsToDeadline - hoursToSeconds(hours))

  return `${isExpired ? t(TranslationKey['Overdue by']) + '\n' : ''} ${hours} ${t(TranslationKey.hour)} ${mins} ${
    t(TranslationKey.minute) + '.'
  }${withSeconds ? seconds + t(TranslationKey['s.']) : ''}`
}

export const objectToUrlQs = obj => decodeURI(QueryString.stringify(obj).replaceAll('&', ';')).replaceAll('%24', '$')

export const getTableByColumn = (column, hint) => {
  if (['humanFriendlyId', 'amount', 'destination', 'logicsTariff'].includes(column)) {
    return 'boxes'
  } else if (['id', 'item'].includes(column)) {
    return 'orders'
  } else if (
    [
      'asin',
      'skusByClient',
      'amazonTitle',
      'shopIds',
      'strategyStatus',
      'amountInOrders',
      'stockUSA',
      'inTransfer',
      'boxAmounts',
      'sumStock',
      // 'purchaseQuantity',
      'amazon',
      'profit',
      'fbafee',
    ].includes(column)
  ) {
    return 'products'
  } else if (['status', 'updatedAt', 'createdAt'].includes(column)) {
    if (hint === 'boxes') {
      return 'boxes'
    } else if (hint === 'products') {
      return 'products'
    }
  }
}

export const getStatusByColumnKeyAndStatusKey = (status, columnKey) => {
  switch (columnKey) {
    case columnnsKeys.client.INVENTORY_STRATEGY_STATUS:
      return mapProductStrategyStatusEnum[status]?.replace(/_/g, ' ')
    case columnnsKeys.client.INVENTORY_STATUS:
      return t(productStatusTranslateKey(ProductStatusByCode[status]))
    default:
      return status
  }
}
