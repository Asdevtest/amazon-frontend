import {UserRole} from '@constants/user-roles'

export const isNotUndefined = value => typeof value !== 'undefined'
export const isUndefined = value => typeof value === 'undefined'

export const isNull = value => typeof value === null
export const isNotNull = value => typeof value !== null

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

export const isMasterUser = user => !!user.masterUser

export const noPermissionsUser = user => !user.permissions

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
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
