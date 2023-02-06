import {BACKEND_API_URL} from '@constants/env'
import {UserRole} from '@constants/user-roles'

export const isNotUndefined = value => typeof value !== 'undefined'
export const isUndefined = value => typeof value === 'undefined'

export const isNull = value => value === null
export const isNotNull = value => value !== null

export const checkIsResearcher = userRole => userRole === UserRole.RESEARCHER
export const checkIsSupervisor = userRole => userRole === UserRole.SUPERVISOR
export const checkIsBuyer = userRole => userRole === UserRole.BUYER
export const checkIsClient = userRole => userRole === UserRole.CLIENT
export const checkIsAdmin = userRole => userRole === UserRole.ADMIN
export const checkIsStorekeeper = userRole => userRole === UserRole.STOREKEEPER

export const checkIsAbsoluteUrl = url => new RegExp('^(?:[a-z]+:)?//', 'i').test(url)

export const checkIsPositiveNum = str => !(Number(str) < 0 || isNaN(str))
export const checkIsMoreTwoCharactersAfterDot = str => {
  str += ''
  const indexOfDot = str.indexOf('.')
  const dotPositionFromEnd = indexOfDot - str.length
  if (indexOfDot === -1 || dotPositionFromEnd >= -3) {
    return false
  }
  return true
}

export const checkIsMoreNCharactersAfterDot = (str, max) => {
  str += ''
  const indexOfDot = str.indexOf('.')
  const dotPositionFromEnd = indexOfDot - str.length + 1
  if (indexOfDot === -1 || dotPositionFromEnd >= -max) {
    return false
  }
  return true
}
export const checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot = str =>
  checkIsPositiveNum(str) && !checkIsMoreTwoCharactersAfterDot(str)

export const checkIsPositiveNummberAndNoMoreNCharactersAfterDot = (str, max) =>
  checkIsPositiveNum(str) && !checkIsMoreNCharactersAfterDot(str, max)

export const isHaveMasterUser = user => !!user.masterUser

// export const noPermissionsUser = user => !user.permissions // Не используется

export const findTariffInStorekeepersData = (storekeepers, storekeeperId, logicsTariffId) =>
  storekeepers.find(el => el._id === storekeeperId)?.tariffLogistics.find(el => el._id === logicsTariffId)

export const checkIsImageLink = link =>
  link.endsWith('.png') ||
  link.endsWith('.jpg') ||
  link.endsWith('.ico') ||
  link.endsWith('.gif') ||
  link.endsWith('.svg') ||
  link.endsWith('.webp') ||
  link.endsWith('.avif') ||
  link.endsWith('.jpeg')

export const validateEmail = email =>
  String(email)
    .toLowerCase()
    .match(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9]{1,})$/,
    )

export const checkIsString = value => typeof value === 'string'

export const checkIsStringFilesSame = (str1, str2) => {
  if (str1?.includes(BACKEND_API_URL) && str2?.includes(BACKEND_API_URL)) {
    const idLength = 36

    const strWithoutUrl1 = str1.replace(`${BACKEND_API_URL}/uploads/`, '')
    const newStr1 = strWithoutUrl1.slice(idLength, strWithoutUrl1.length)

    const strWithoutUrl2 = str2.replace(`${BACKEND_API_URL}/uploads/`, '')
    const newStr2 = strWithoutUrl2.slice(idLength, strWithoutUrl2.length)

    return newStr1 === newStr2
  } else {
    return str1 === str2
  }
}
