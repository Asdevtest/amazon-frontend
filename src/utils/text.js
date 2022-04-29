import * as Showdown from 'showdown'
import * as xssFilter from 'showdown-xss-filter'

import {zipCodeGroups} from '@constants/zip-code-groups'

import {checkIsAbsoluteUrl} from './checks'

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
export const withKg = str => (str && str !== '0' ? `${str} кг` : str)
export const withAmount = str => (str && str !== '0' ? `${str} шт` : str)
export const withCm = str => (str && str !== '0' ? `${str} см` : str)

export const withText = (str, text) => (str && str !== 0 ? `${str}${text}` : str)

export const checkAndMakeAbsoluteUrl = urlStr => (checkIsAbsoluteUrl(urlStr) ? urlStr : `https://${urlStr}`)

export const clearSpecialCharacters = str => str.replace(/[{}"!@#$%^&*()+=;:`~|'?/.><, ]/, '')

export const shortenLongString = (value, lengthBreakpoint) =>
  value.length > lengthBreakpoint ? `${value.slice(0, lengthBreakpoint)}...` : value

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: [xssFilter],
})

export const getTextFromMarkdown = markdown => converter.makeHtml(markdown)

export const minsToTimeRus = mins => `${mins / 60 > 1 ? Math.floor(mins / 60) : 0} часов ${mins % 60} минут`

export const getFullTariffTextForBox = box => {
  const firstNumOfCode = box.destination?.zipCode?.[0]

  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  return `${box.logicsTariff?.name || 'n/a'} / ${regionOfDeliveryName || 'n/a'} / ${
    box.logicsTariff?.conditionsByRegion[regionOfDeliveryName]?.rate || 'n/a'
  } $`
}
