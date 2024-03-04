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
  checkIsMediaFileLink,
  checkIsVideoLink,
} from '@utils/checks'
import { removeText } from '@utils/text'

export const getAmazonImageUrl = (str, isBig) => {
  if (!str || str.endsWith('.com')) {
    return '/assets/img/no-photo.jpg'
  }

  if (checkIsHasHttp(str)) {
    return checkIsMediaFileLink(str)
      ? !isBig &&
        !str.includes('.preview.webp') &&
        !str.includes('.bmp') &&
        !str.includes('.png') &&
        !str.includes('.ico')
        ? str + amazonImageUrlPostfix
        : str
      : str /* + amazonImageUrlPostfix */ // deleted because of Google drive link or files
  } else if (str.includes('/uploads/')) {
    return `${BACKEND_API_URL}${str}${
      !checkIsGif(str) /* && !checkIsImageInludesPostfixes(str) */ &&
      !checkIsVideoLink(str) &&
      !checkIsDocumentLink(str)
        ? checkIsMediaFileLink(str) &&
          !isBig &&
          !str.includes('.preview.webp') &&
          !str.includes('.bmp') &&
          !str.includes('.png') &&
          !str.includes('.ico')
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
