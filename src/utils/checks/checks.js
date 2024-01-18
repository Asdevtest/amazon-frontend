import {
  amazonImageUrlBigPostfix,
  amazonImageUrlMiddlePostfix,
  amazonImageUrlSmallPostfix,
} from '@constants/configs/amazon-images'
import { maxLengthInputInSizeBox } from '@constants/configs/sizes-settings'
import { BACKEND_API_URL } from '@constants/keys/env'
import { UserRole } from '@constants/keys/user-roles'
import { statusesValidToShowResoult } from '@constants/requests/request-proposal-status'
import { YOUTUBE_LINK } from '@constants/text'

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
export const checkIsFreelancer = userRole => userRole === UserRole.FREELANCER
export const checkIsWithoutProductPermissions = userRole =>
  userRole === UserRole.STOREKEEPER || userRole === UserRole.FREELANCER

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

// export const noPermissionsUser = user => !user.permissions // Не используется

export const findTariffInStorekeepersData = (storekeepers, storekeeperId, logicsTariffId) =>
  storekeepers?.find(el => el?._id === storekeeperId)?.tariffLogistics?.find(el => el?._id === logicsTariffId)

export const checkIsVideoLink = link =>
  link?.includes('.3g2') ||
  link?.includes('.3gp') ||
  link?.includes('.3gp2') ||
  link?.includes('.3gpp') ||
  link?.includes('.3gpp2') ||
  link?.includes('.asf') ||
  link?.includes('.asx') ||
  link?.includes('.avi') ||
  link?.includes('.bin') ||
  link?.includes('.dat') ||
  link?.includes('.drv') ||
  link?.includes('.f4v') ||
  link?.includes('.flv') ||
  link?.includes('.gtp') ||
  link?.includes('.h264') ||
  link?.includes('.m4v') ||
  link?.includes('.mkv') ||
  link?.includes('.mod') ||
  link?.includes('.moov') ||
  link?.includes('.mov') ||
  link?.includes('.mp4') ||
  link?.includes('.mpeg') ||
  link?.includes('.mpg') ||
  link?.includes('.mts') ||
  link?.includes('.rm') ||
  link?.includes('.rmvb') ||
  link?.includes('.spl') ||
  link?.includes('.srt') ||
  link?.includes('.stl') ||
  link?.includes('.swf') ||
  link?.includes('.ts') ||
  link?.includes('.vcd') ||
  link?.includes('.vid') ||
  link?.includes('.vob') ||
  link?.includes('.webm') ||
  link?.includes('.wm') ||
  link?.includes('.wmv') ||
  link?.includes('.yuv') ||
  link?.includes(YOUTUBE_LINK)

export const checkIsImageLink = link =>
  link?.includes('png') ||
  link?.includes('PNG') ||
  link?.includes('jpg') ||
  link?.includes('ico') ||
  link?.includes('gif') ||
  link?.includes('svg') ||
  link?.includes('webp') ||
  link?.includes('avif') ||
  link?.includes('jpeg') ||
  link?.includes('rotated-image') ||
  link?.includes('jfif') ||
  link?.includes('bmp') ||
  link?.includes('placeimg.com')

export const checkIsMediaFileLink = link => checkIsVideoLink(link) || checkIsImageLink(link)

export const checkIsDocumentLink = link =>
  link?.includes('doc') ||
  link?.includes('docx') ||
  link?.includes('pdf') ||
  link?.includes('xlsx') ||
  link?.includes('xls') ||
  link?.includes('txt') ||
  link?.includes('csv') ||
  link?.includes('djvu') ||
  (link?.includes('.com') && !checkIsImageLink('placeimg.com')) ||
  link?.includes('drive.google.com') ||
  link?.includes('docs.google.com')
// https://m.media-amazon.com/images/I/71CznSVO40L._AC_SY450_.jpg
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
