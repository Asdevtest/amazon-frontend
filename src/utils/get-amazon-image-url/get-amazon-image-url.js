import {
  amazonImageUrlBigPostfix,
  amazonImageUrlPrefix,
  amazonImageUrlSmallPostfix,
} from '@constants/configs/amazon-images'
import { BACKEND_API_URL } from '@constants/keys/env'

export const getAmazonImageUrl = (str, big) => {
  if (str) {
    if (str.includes(BACKEND_API_URL)) {
      if (str.includes('.preview.webp')) {
        return str
      } else {
        return big ? str : str + '.preview.webp'
      }
    } else if (str.includes('http')) {
      return str
    } else if (str.includes('base64')) {
      return str
    } else {
      return `${amazonImageUrlPrefix}${str}${big ? amazonImageUrlBigPostfix : amazonImageUrlSmallPostfix}`
    }
  } else {
    return '/assets/img/no-photo.jpg'
  }
}
