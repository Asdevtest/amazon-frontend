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
      if ((skipUndefined && isUndefined(obj[key])) || (!keepNull && isNull(obj[key]))) {
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
