/* eslint-disable prefer-arrow/prefer-arrow-functions */

/* eslint-disable no-prototype-builtins */
import { isNull, isUndefined } from '@utils/checks'

export const getObjectKeys = target => Object.keys(target)

export const getObjectEntries = (target, rules) => {
  const entries = Object.entries(target).filter(([key]) => (rules ? !!rules[key] : true))
  return entries.map(([, value]) => value)
}

export const getObjectFilteredByKeyArrayWhiteList = (obj, keyArr, skipUndefined, valueModifier, keepNull) =>
  Object.keys(obj)
    .filter(key => keyArr.includes(key))
    .reduce((acc, key) => {
      if ((skipUndefined && isUndefined(obj[key])) || (!keepNull && isNull(obj[key]) && key !== 'deadline')) {
        return acc
      } else {
        acc[key] = valueModifier ? valueModifier(key, obj[key]) : obj[key]
        return acc
      }
    }, {})

export const getObjectFilteredByKeyArrayBlackList = (obj, keyArr, skipUndefined, valueModifier, keepNull) =>
  Object.keys(obj)
    .filter(key => !keyArr.includes(key))
    .reduce((acc, key) => {
      if ((skipUndefined && isUndefined(obj[key])) || (!keepNull && isNull(obj[key]))) {
        return acc
      } else {
        acc[key] = valueModifier ? valueModifier(key, obj[key]) : obj[key]
        return acc
      }
    }, {})

export const objectFlip = (obj, valueFunc) =>
  Object.entries(obj).reduce((ret, entry) => {
    const [key, value] = entry
    ret[value] = valueFunc ? valueFunc(key) : key
    return ret
  }, {})

export const getMaxObjPropertyByField = (array, objProperty) => {
  const numbArr = array.map(item => item[objProperty])
  return Math.max.apply(Math, numbArr)
}

export const getMinObjPropertyByField = (array, objProperty) => {
  const numbArr = array.map(item => item[objProperty])
  return Math.min.apply(Math, numbArr)
}

export const getNewObjectWithDefaultValue = (target, defaultValue) =>
  getObjectKeys(target).reduce((acc, cur) => {
    acc[cur] = defaultValue
    return acc
  }, {})

export const filterNullValues = obj => {
  const result = {}

  Object.keys(obj).forEach(key => {
    if (obj[key] !== null) {
      result[key] = obj[key]
    }
  })

  return result
}

export const objectDeepCompare = (obj1, obj2) => {
  // Сравнение по ссылкам
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  // Если это простые типы (числа, строки, булевы значения), сравнить их напрямую
  if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2
  }

  // Если это массивы, сравнить их элементы
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) {
      return false
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!objectDeepCompare(obj1[i], obj2[i])) {
        return false
      }
    }
    return true
  }

  // Если это объекты, сравнить их свойства
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key) || !objectDeepCompare(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

export const getSumPropertiesObject = object => {
  let result = 0

  for (const key in object) {
    if (typeof object[key] === 'number') {
      result += object[key]
    }
  }

  return result
}
