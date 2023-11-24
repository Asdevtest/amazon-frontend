import {
  amazonImageUrlBigPostfix,
  amazonImageUrlPostfix,
  amazonImageUrlPrefix,
  amazonImageUrlSmallPostfix,
} from '@constants/configs/amazon-images'
import { BACKEND_API_URL } from '@constants/keys/env'

import {
  checkIsDocumentLink,
  checkIsGif,
  checkIsHasHttp,
  checkIsImageInludesPostfixes,
  checkIsImageLink,
  checkIsVideoLink,
} from '@utils/checks'
import { removeText } from '@utils/text'

export const getAmazonImageUrl = (str, isBig) => {
  if (!str || str.endsWith('.com')) {
    return '/assets/img/no-photo.jpg'
  }

  if (checkIsHasHttp(str)) {
    return checkIsImageLink(str) ? str : str + amazonImageUrlPostfix
  } else if (str.includes('/uploads/')) {
    return `${BACKEND_API_URL}${str}${
      !checkIsGif(str) && !checkIsImageInludesPostfixes(str) && !checkIsVideoLink(str) && !checkIsDocumentLink(str)
        ? checkIsImageLink(str) && !isBig
          ? amazonImageUrlPostfix
          : ''
        : ''
    }`
  } else {
    if (checkIsImageInludesPostfixes(str) || checkIsVideoLink(str) || checkIsDocumentLink(str)) {
      return amazonImageUrlPrefix + str
    } else {
      return `${amazonImageUrlPrefix}${removeText(str, '.jpg')}${
        isBig && !checkIsGif(str) ? amazonImageUrlBigPostfix : amazonImageUrlSmallPostfix
      }`
    }
  }
}
