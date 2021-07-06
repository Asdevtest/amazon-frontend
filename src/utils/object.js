import {isUndefined} from './checks'

/**
 * Returns typed array of object keys.
 *
 * Usage:
 *
 * ```ts
 * const arr = getObjectKeys({ a: 1, b: 2 })
 * console.log(arr) // ['a', 'b'] with type ('a' | 'b')[]
 * ```
 */
export const getObjectKeys = target => Object.keys(target)

/**
   * Returns array of object entries. If you usage rules entries will be filtered by rules
   *
   * Usage:
   *
   * ```ts
   * const obj = { a: 1, b: 2 };
   *
   * const entries1 = getObjectEntries(obj)
   * console.log(entries1) // [1, 2] with type number[]
   *
   * const entries2 = getObjectEntries(obj, { a: true })
   * console.log(entries2) // [1] with type number[]
   * ```
  })
   */
export const getObjectEntries = (target, rules) => {
  const entries = Object.entries(target).filter(([key]) => (rules ? !!rules[key] : true))
  return entries.map(([, value]) => value)
}

export const getObjectFilteredByKeyArrayWhiteList = (obj, keyArr, skipUndefined, valueModifier) =>
  Object.keys(obj)
    .filter(key => keyArr.includes(key))
    .reduce((acc, key) => {
      if (skipUndefined && isUndefined(obj[key])) {
        return acc
      } else {
        acc[key] = valueModifier ? valueModifier(key, obj[key]) : obj[key]
        return acc
      }
    }, {})

export const getObjectFilteredByKeyArrayBlackList = (obj, keyArr, skipUndefined, valueModifier) =>
  Object.keys(obj)
    .filter(key => !keyArr.includes(key))
    .reduce((acc, key) => {
      if (skipUndefined && isUndefined(obj[key])) {
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
