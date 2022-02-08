import {amazonImageUrlPostfix, amazonImageUrlPrefix} from '@constants/amazon-images'

export const getAmazonImageUrl = hash =>
  hash
    ? hash.includes('http')
      ? hash
      : `${amazonImageUrlPrefix}${hash}${amazonImageUrlPostfix}`
    : '/assets/img/no-photo.jpg'
