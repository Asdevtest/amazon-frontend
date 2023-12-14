import { hoursToSeconds, minutesToHours, secondsToHours, secondsToMinutes } from 'date-fns'
import QueryString from 'qs'

import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { NotificationType } from '@constants/keys/notifications'
import { OrderStatusByCode, OrderStatusTranslate } from '@constants/orders/order-status'
import { ProductStatusByCode, productStatusTranslateKey } from '@constants/product/product-status'
import { humanFriendlyStategyStatus, mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { difficultyLevelByCode, difficultyLevelTranslate } from '@constants/statuses/difficulty-level'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { checkIsAbsoluteUrl } from '@utils/checks'

import { getDistanceBetweenDatesInSeconds } from '../date-time'
import { t } from '../translations'

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

export const removeText = (originalText, valueToRemove) => originalText.replaceAll(valueToRemove, '')

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
          ? Math.floor(hours) + ' ' + t(TranslationKey.hour)
          : Math.floor(hours % 24) + ' ' + t(TranslationKey.hour)
        : ''
    } ${
      Math.floor(lastMins) === 0
        ? Math.floor(lastMins * 60) + ' ' + t(TranslationKey.sec)
        : Math.floor(lastMins) + ' ' + t(TranslationKey.minute) + '.'
    }`
  } else {
    return null
  }
}

export const secondsToTime = secs => {
  if (secs >= 60) {
    const days = Math.floor(secs / 86400)
    const hours = Math.floor((secs % 86400) / 3600)
    const minutes = Math.floor((secs % 3600) / 60)
    const seconds = Math.floor(secs % 60)

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  } else {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: secs,
    }
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
      'boxesCount',
      'etd',
      'eta',
      'cls',
      'trackingNumber',
      'arrivalDate',
      'deliveryTotalPrice',
      'partialPaymentAmountRmb',
      'batchHumanFriendlyId',
    ].includes(column)
  ) {
    if (['humanFriendlyId', 'boxesCount', 'trackingNumber', 'arrivalDate'].includes(column) && hint === 'batches') {
      return 'batches'
    }

    if (column === 'batchHumanFriendlyId' && hint === 'boxes') {
      return 'batches'
    }

    if (['totalPrice'].includes(column) && hint === 'batches') {
      return 'orders'
    }

    if (['buyerComment'].includes(column) && hint === 'ideas') {
      return 'ideas'
    }

    if (['amount'].includes(column) && hint === 'ideas') {
      return 'products'
    }

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
      'parentProductSkusByClient',
      'parentProductAmazonTitle',
      'parentProductAsin',
      'childProductAmazonTitle',
      'childProductSkusByClient',
      'childProductAsin',
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
      'ideasFinished',
      'bsr',
      'fbaamount',
      'client',
      'buyer',
      'childProductShopIds',
      'parentProductShopIds',
      'supervisor',
      'margin',
      'checkedBy',
      'checkednotes',
      'currentSupplier',
      'weight',
      'createdAt',
      'updatedAt',
    ].includes(column)
  ) {
    if (['buyer'].includes(column) && hint === 'orders') {
      return 'orders'
    } else if (['childProductShopIds', 'parentProductShopIds'].includes(column) && hint === 'ideas') {
      return 'products'
    } else if (
      [
        'parentProductSkusByClient',
        'parentProductAmazonTitle',
        'parentProductAsin',
        'childProductAmazonTitle',
        'childProductSkusByClient',
        'childProductAsin',
      ].includes(column) &&
      hint === 'ideas'
    ) {
      return 'products'
    } else if (hint === 'ideas') {
      return 'ideas'
    }
    return 'products'
  } else if (['status', 'updatedAt', 'createdAt', 'tags', 'redFlags', 'createdBy', 'taskComplexity'].includes(column)) {
    if (hint === 'orders') {
      return 'orders'
    } else if (hint === 'boxes') {
      return 'boxes'
    } else if (hint === 'products') {
      return 'products'
    } else if (hint === 'batches') {
      return 'batches'
    } else if (hint === 'ideas') {
      return 'ideas'
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
    if (hint === 'batches') {
      return 'batches'
    }
    if (hint === 'ideas') {
      return 'ideas'
    }

    return 'requests'
  } else if (['productionTerm', 'minlot'].includes(column)) {
    return 'suppliers'
  } else if (['finalWeight'].includes(column)) {
    return 'batches'
  } else if (
    [
      'comments',
      'dateStatusOnCheck',
      'minBatch',
      'dateStatusProductCreating',
      'dateStatusProductCreating',
      'dateStatusAddingAsin',
      'intervalStatusNew',
      'intervalStatusOnCheck',
      'intervalStatusSupplierSearch',
      'intervalStatusSupplierFound',
      'intervalStatusProductCreating',
      'intervalStatusAddingAsin',
      'intervalStatusFinished',
      'intervalsSum',
    ].includes(column)
  ) {
    return 'ideas'
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

    case columnnsKeys.client.IDEAS_STATUS:
      return ideaStatusTranslate(ideaStatusByCode[status])
    case columnnsKeys.admin.STRATEGY_STATUS:
      return humanFriendlyStategyStatus(mapProductStrategyStatusEnum[status])

    case columnnsKeys.shared.TASK_COMPLEXITY:
      return difficultyLevelTranslate(difficultyLevelByCode[status])

    default:
      return status
  }
}

export const replaceCommaByDot = str => str.replaceAll(',', '.')

const imgTypes = [
  '.bmp',
  '.cdr',
  '.gif',
  '.heif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.pbm',
  '.pcx',
  '.pgm',
  '.png',
  '.ppm',
  '.psd',
  '.raw',
  '.svg',
  '.tga',
  '.tif',
  '.wbmp',
  '.web',
  '.xbm',
  '.xpm',
  '.jfif',
  '.webp',
]

export const imagesRegex = new RegExp(`(https?:\\/\\/.*(?:${imgTypes.join('|')}))`, 'i')
export const imagesWithPreviewRegex = new RegExp(`(https?:\\/\\/.*(?:${imgTypes.join('|')}))\\.preview\\.webp`, 'i')

export const getHumanFriendlyNotificationType = type => {
  switch (type) {
    case NotificationType.Box:
      return t(TranslationKey.Box)

    case NotificationType.Order:
      return t(TranslationKey.Order)

    case NotificationType.Idea:
      return t(TranslationKey.Idea)

    case NotificationType.Request:
      return t(TranslationKey.Request)

    case NotificationType.Proposal:
      return t(TranslationKey.Proposal)

    default:
      break
  }
}
