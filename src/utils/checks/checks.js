import {
  amazonImageUrlBigPostfix,
  amazonImageUrlMiddlePostfix,
  amazonImageUrlSmallPostfix,
} from '@constants/configs/amazon-images'
import { maxLengthInputInSizeBox } from '@constants/configs/sizes-settings'
import { BACKEND_API_URL } from '@constants/keys/env'
import { docValidTypes } from '@constants/media/doc-types'
import { imageValidTypes } from '@constants/media/image-types'
import { videoValidTypes } from '@constants/media/video-types'
import { statusesValidToShowResoult } from '@constants/requests/request-proposal-status'

import { Roles } from '@typings/enums/roles'

export const isNotUndefined = value => typeof value !== 'undefined'
export const isUndefined = value => typeof value === 'undefined'

export const isNull = value => value === null
export const isNotNull = value => value !== null

export const checkIsResearcher = userRole => userRole === Roles.RESEARCHER
export const checkIsSupervisor = userRole => userRole === Roles.SUPERVISOR
export const checkIsBuyer = userRole => userRole === Roles.BUYER
export const checkIsClient = userRole => userRole === Roles.CLIENT
export const checkIsAdmin = userRole => userRole === Roles.ADMIN
export const checkIsStorekeeper = userRole => userRole === Roles.STOREKEEPER
export const checkIsFreelancer = userRole => userRole === Roles.FREELANCER
export const checkIsWithoutProductPermissions = userRole =>
  userRole === Roles.STOREKEEPER || userRole === Roles.FREELANCER

export const checkIsAbsoluteUrl = url => new RegExp('^(?:[a-z]+:)?//', 'i').test(url)

export const checkIsNumberWithDot = str => {
  return /^\d*\.?\d*$/.test(str)
}
export const checkIsPositiveNum = str => !(Number(str) < 0 || isNaN(str))
export const checkIsPositiveOrNegativeDigit = str => /^-?\d*\.?\d+$/.test(Number(str)) || '-' === str

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

export const findTariffInStorekeepersData = (storekeepers, storekeeperId, logicsTariffId) =>
  storekeepers?.find(el => el?._id === storekeeperId)?.tariffLogistics?.find(el => el?._id === logicsTariffId)

export const checkIsExternalVideoLink = url => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

  return youtubeRegex.test(url)
}

export const checkIsVideoLink = link =>
  videoValidTypes.some(type => link?.includes(type)) || checkIsExternalVideoLink(link)

export const checkIsImageLink = link => imageValidTypes.some(type => link?.includes(type))

export const checkIsMediaFileLink = link => checkIsVideoLink(link) || checkIsImageLink(link)

export const checkIsDocumentLink = link =>
  docValidTypes.some(type => link?.includes(type)) || (link?.includes('.com') && !checkIsImageLink('placeimg.com'))

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

export const isStringInArray = (str, arr) => arr.includes(str)

export const checkDateByDeadline = date => (date !== null ? date < new Date() : false)

export const checkIsImageUrlValid = async selectedImageUrl =>
  new Promise(resolve => {
    const img = new Image()
    img.src = selectedImageUrl

    img.onload = () => {
      resolve(true)
    }

    img.onerror = () => {
      resolve(false)
    }
  })

export const checkIsValidProposalStatusToShowResoult = status => statusesValidToShowResoult.includes(status)

export const checkIsHasHttp = str => {
  const reg = /^https?:\/\//
  return reg.test(str)
}

export const checkIsGif = str => str.endsWith('.gif')

export const checkIsImageInludesPostfixes = str =>
  [amazonImageUrlBigPostfix, amazonImageUrlSmallPostfix, amazonImageUrlMiddlePostfix, 'base64', 'placeimg.com'].some(
    item => str.includes(item),
  )

export const checkIsValidBoxSize = field => !Number(field) || Number(field) > maxLengthInputInSizeBox
