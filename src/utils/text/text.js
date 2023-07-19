/* eslint-disable no-unused-vars */
import { hoursToSeconds, minutesToHours, secondsToHours, secondsToMinutes } from 'date-fns'
import QueryString from 'qs'

import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { ProductStatusByCode, productStatusTranslateKey } from '@constants/product/product-status'
import { humanFriendlyStategyStatus, mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { checkIsAbsoluteUrl } from '@utils/checks'

import { getDistanceBetweenDatesInSeconds } from '../date-time'
import { t } from '../translations'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { OrderStatusByCode, OrderStatusTranslate } from '@constants/orders/order-status'

export const getShortenStringIfLongerThanCount = (str, count, showEnd) =>
  str?.length > count ? `${str.slice(0, count)}...${showEnd ? str.slice(str.length - 3) : ''}` : str

export const getModelNameWithotPostfix = modelName =>
  modelName && typeof modelName === 'string' ? modelName.replace('Static', '') : null

export const trimBarcode = value => (value && value.length >= 8 ? String(value.substr(-8)) : value)

export const toFixed = (int, x) => (int && typeof int === 'number' ? int.toFixed(x) : int)

export const getFloatOrZero = str => (str ? parseFloat(str) || 0 : 0)

export const toFixedWithDollarSign = (int, x) => withDollarSign(toFixed(int, x))
export const toFixedWithYuanSign = (int, x) => withYuanSign(toFixed(int, x))

export const toFixedWithKg = (int, x) => withKg(toFixed(int, x))
export const toFixedWithCm = (int, x) => withCm(toFixed(int, x))

export const withDollarSign = str => (str && str !== '0' ? `${str} $` : str)
export const withYuanSign = str => (str && str !== '0' ? `${str} Ұ` : str)
export const withKg = str => (str && str !== '0' ? `${str} ${t(TranslationKey.kg)}` : str)
export const withAmount = str => (str && str !== '0' ? `${str} ${t(TranslationKey['pcs.'])}` : str)
export const withCm = str => (str && str !== '0' ? `${str} ${t(TranslationKey.cm)}` : str)

export const withText = (str, text) => (str && str !== 0 ? `${str}${text}` : str)

export const checkAndMakeAbsoluteUrl = urlStr => (checkIsAbsoluteUrl(urlStr) ? urlStr : `https://${urlStr}`)

export const clearSpecialCharacters = value =>
  typeof value === 'string' ? value.replace(/[{}"!@#$%^&*()+=;:`~|'?/.><, ]/, '') : value

export const clearEverythingExceptNumbers = value => (typeof value === 'string' ? value.replace(/\D/gi, '') : value)

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
    const days = mins / 1440

    const hours = minutesToHours(mins)

    const lastMins = mins % 60

    return `${days >= 1 ? Math.floor(days) + ' ' + t(TranslationKey.days) : ''} ${
      hours >= 1
        ? hours <= 23
          ? hours + ' ' + t(TranslationKey.hour)
          : (hours % 24) + ' ' + t(TranslationKey.hour)
        : ''
    } ${lastMins === 0 ? '' : lastMins + ' ' + t(TranslationKey.minute) + '.'}`
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

export const getNewTariffTextForBoxOrOrder = (box, withoutRate) => {
  if (!box || (!box.destination && !box.logicsTariff)) {
    return t(TranslationKey['Not available'])
  }

  const firstNumOfCode = box.destination?.zipCode?.[0] || null

  const regionOfDeliveryName =
    firstNumOfCode === null ? null : zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const rate = box.logicsTariff?.conditionsByRegion?.[regionOfDeliveryName]?.rate || box?.variationTariff?.pricePerKgUsd

  return `${box.logicsTariff?.name || ''}${rate && !withoutRate ? ' / ' + toFixed(rate, 2) + '$' : ''}`
}

export const shortSku = value => getShortenStringIfLongerThanCount(value, 12)
export const shortAsin = value => getShortenStringIfLongerThanCount(value, 10)

export const timeToDeadlineInHoursAndMins = ({ date, withSeconds, now }) => {
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

export const timeToDeadlineInDaysAndHours = ({ date, now }) => {
  const secondsToDeadline = getDistanceBetweenDatesInSeconds(date, now)

  const isExpired = secondsToDeadline < 0

  const absSecondsToDeadline = Math.abs(secondsToDeadline)

  const days = Math.floor(absSecondsToDeadline / (3600 * 24))

  const hours = Math.floor((absSecondsToDeadline % (3600 * 24)) / 3600)

  return !isExpired ? `${days} ${t(TranslationKey.days)} ${hours} ${t(TranslationKey.hour)}` : ''
}

export const objectToUrlQs = obj => decodeURI(QueryString.stringify(obj).replaceAll('&', ';')).replaceAll('%24', '$')

export const getTableByColumn = (column, hint) => {
  if (
    [
      'humanFriendlyId',
      'amount',
      'destination',
      'logicsTariff',
      'prepId',
      'storekeeper',
      'batchId',
      'sub',
      'totalPrice',
      'priceInYuan',
      'deadline',
      'paymentDateToSupplier',
      'paymentDetailsAttached',
      'needsResearch',
      'clientComment',
      'buyerComment',
      'partiallyPaid',
      'partialPaymentAmountRmb',
    ].includes(column)
  ) {
    if (hint === 'orders') {
      return 'orders'
    } else if (hint === 'requests') {
      return 'requests'
    } else {
      return 'boxes'
    }
  } else if (['id', 'item', 'paymentMethod'].includes(column)) {
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
      'reservedSum',
      'sentToFbaSum',
      'fbaFbmStockSum',
      'ideasOnCheck',
      'stockCost',
      'purchaseQuantity',
      'ideasClosed',
      'ideasVerified',
      'bsr',
      'fbaamount',
      'client',
      'buyer',
    ].includes(column)
  ) {
    // if (hint === 'requests') {
    //   return 'requests'
    // } else {
    return 'products'
    // }
  } else if (['status', 'updatedAt', 'createdAt', 'tags', 'redFlags', 'createdBy'].includes(column)) {
    if (hint === 'orders') {
      return 'orders'
    } else if (hint === 'boxes') {
      return 'boxes'
    } else if (hint === 'products') {
      return 'products'
    } else {
      return 'requests'
    }
  } else if (
    [
      'title',
      'typeTask',
      'price',
      'timeoutAt',
      // 'createdBy',
      'subUsers',
      'priority',
      'priceAmazon',
      'withoutConfirmation',
      'announcementCreatedBy',
    ].includes(column)
  ) {
    if (hint === 'orders') {
      return 'orders'
    }

    return 'requests'
  } else if (['productionTerm'].includes(column)) {
    return 'suppliers'
  }
}

export const getStatusByColumnKeyAndStatusKey = (status, columnKey) => {
  switch (columnKey) {
    case columnnsKeys.client.INVENTORY_STRATEGY_STATUS:
      return humanFriendlyStategyStatus(mapProductStrategyStatusEnum[status])
    case columnnsKeys.client.INVENTORY_STATUS:
      return t(productStatusTranslateKey(ProductStatusByCode[status]))
    case columnnsKeys.buyer.MY_PRODUCTS_STATUS:
      return t(productStatusTranslateKey(ProductStatusByCode[status]))
    case columnnsKeys.client.FREELANCE_MY_REQUESTS:
      return MyRequestStatusTranslate(status)
    case columnnsKeys.client.FREELANCE_REQUEST_TYPE_MY:
      return freelanceRequestTypeTranslate(freelanceRequestTypeByCode[status])
    case columnnsKeys.client.ORDERS_STATUS:
      return OrderStatusTranslate(OrderStatusByCode[status])
    default:
      return status
  }
}

export const replaceCommaByDot = str => str.replaceAll(',', '.')
